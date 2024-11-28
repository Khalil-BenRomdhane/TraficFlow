from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")
# Charger le fichier de configuration
def load_config():
    with open('config.json', 'r') as config_file:
        config = json.load(config_file)
    return config

# Charger les services de modèles depuis le fichier de configuration
config = load_config()
MODEL_SERVICES = config["model_services"]

# Point d'entrée pour l'API Gateway
@app.route('/')
def home():
    return "API Gateway is Running!"

@app.route('/gateway/predict', methods=['POST'])
def predict():
    # Récupérer les données JSON envoyées
    data = request.json

    # Extraire le mois de la donnée
    month = float(data['month'])

    # Sélectionner le modèle en fonction du mois
    if 1 <= month <= 4:
        model_url = MODEL_SERVICES['service_cluster_1']
    elif 5 <= month <= 11:
        model_url = MODEL_SERVICES['service_cluster_2']
    else:
        model_url = MODEL_SERVICES['service_cluster_3']

    # Faire une requête POST au service du modèle
    try:
        response = requests.post(model_url, json=data)

        # Vérifier si la réponse est valide
        if response.status_code != 200:
            return jsonify({"error": "Error in model response."}), 500

        # Retourner la prédiction renvoyée par le modèle
        return jsonify(response.json())

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/gateway/search', methods=['POST'])
def query():
    data = request.get_json()
    query = data.get('q', '').strip().lower()
    
    if not query:
        return jsonify({"error": "Missing query parameter 'q' in the request body"}), 400
    
    try:
        response = requests.post("http://127.0.0.1:5010/search", json={"q": query})
        response.raise_for_status()  # Raise an exception for HTTP errors
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to connect to search service: {str(e)}"}), 500


  


# Lancer le serveur Flask pour l'API Gateway
if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0", port=5000)  # API Gateway sera disponible sur le port 5000
