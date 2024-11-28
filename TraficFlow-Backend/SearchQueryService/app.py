from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")

# Charger les données du fichier JSON
try:
    # Charger les données depuis le fichier JSON
    resultat_unique = pd.read_json("trafic_search_2df.json")

    # S'assurer que les colonnes nécessaires existent
    required_columns = ['Libelle', 'Libelle noeud amont', 'Libelle noeud aval', 'geo_point_2d']
    for col in required_columns:
        if col not in resultat_unique.columns:
            raise ValueError(f"La colonne '{col}' est manquante dans le fichier JSON.")
    
    # Supprimer les lignes avec des valeurs nulles ou vides dans 'geo_point_2d'
    resultat_unique = resultat_unique.dropna(subset=['geo_point_2d'])
    resultat_unique = resultat_unique[resultat_unique['geo_point_2d'].str.strip() != '']

    # Supprimer les doublons basés sur la colonne 'Libelle'
    resultat_unique = resultat_unique.drop_duplicates(subset=['Libelle'])

    # Convertir les colonnes nécessaires en minuscules pour normaliser les données
    resultat_unique['Libelle'] = resultat_unique['Libelle'].str.lower()
    resultat_unique['Libelle noeud amont'] = resultat_unique['Libelle noeud amont'].str.lower()
    resultat_unique['Libelle noeud aval'] = resultat_unique['Libelle noeud aval'].str.lower()

except Exception as e:
    resultat_unique = None
    error_message = str(e)

@app.route('/search', methods=['POST'])
def search_data():
    # Vérifier si les données sont correctement chargées
    if resultat_unique is None:
        return jsonify({"error": f"Erreur lors du chargement des données : {error_message}"}), 500

    # Récupérer les données JSON envoyées par le client
    data = request.get_json()
    if not data or 'q' not in data:
        return jsonify({"error": "Paramètre 'q' manquant dans la requête."}), 400

    # Récupérer la valeur de la requête 'q'
    query = data.get('q', '').strip().lower()  # Convertir la requête en minuscule

    # Vérifier si la requête est vide
    if not query:
        return jsonify([])  # Retourner une liste vide si aucun paramètre 'q'

    # Effectuer la recherche dans la colonne 'Libelle'
    try:
        # Rechercher uniquement dans la colonne 'Libelle'
        results = resultat_unique[resultat_unique['Libelle'].str.contains(query, na=False)]

        # Retourner uniquement les colonnes demandées
        response_data = results[['Libelle', 'Libelle noeud amont', 'Libelle noeud aval', 'geo_point_2d']]

        # Convertir les résultats en majuscules si nécessaire pour un affichage standardisé
        response_data['Libelle'] = response_data['Libelle'].str.title()
        response_data['Libelle noeud amont'] = response_data['Libelle noeud amont'].str.title()
        response_data['Libelle noeud aval'] = response_data['Libelle noeud aval'].str.title()

        # Convertir en JSON et retourner la réponse
        return jsonify(response_data.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": f"Erreur lors de la recherche : {str(e)}"}), 500

# Lancer l'application Flask
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5010)
