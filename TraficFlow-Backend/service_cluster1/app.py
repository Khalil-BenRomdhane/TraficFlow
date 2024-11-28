from flask import Flask, request, jsonify
import joblib
import pandas as pd
import xgboost as xgb
from datetime import datetime

# Initialiser l'application Flask
app = Flask(__name__)

# Charger le modèle XGBoost pré-entraîné
try:
    model = joblib.load("xgb_c1.pkl")  # Assurez-vous que le fichier du modèle est correct
except Exception as e:
    print(f"Erreur lors du chargement du modèle XGBoost : {e}")
    model = None

# Liste des colonnes attendues par le modèle
expected_columns = [
    'latitude', 'longitude', 'year', 'month', 'day', 'hour', 'day_of_week',
    'jours_nationaux', 'jours_religieux', 'jours_commerciaux',
    'nom_vacances_Vacances d\'hiver', 'nom_vacances_Vacances d\'été',
    'nom_vacances_Vacances de printemps', 'evenement_speciale', 'tavg'
]

# Charger les fichiers CSV contenant les jours fériés, événements spéciaux et vacances scolaires
def load_csv_file(file_path):
    try:
        return pd.read_csv(file_path, parse_dates=["date"])
    except Exception as e:
        print(f"Erreur lors du chargement du fichier {file_path}: {e}")
        return pd.DataFrame()

jours_commerciaux = load_csv_file('References/jours_feries/jours_commerciaux_df.csv')
jours_nationaux = load_csv_file('References/jours_feries/jours_nationaux_df.csv')
jours_religieux = load_csv_file('References/jours_feries/jours_religieux_df.csv')

vacances_ete = load_csv_file('References/vacances_scolaires/vacances_ete_df.csv')
vacances_hiver = load_csv_file('References/vacances_scolaires/vacances_hiver_df.csv')
vacances_printemps = load_csv_file('References/vacances_scolaires/vacances_printemps_df.csv')

evenements_speciaux = load_csv_file('References/evenements speciaux/evenements_speciaux_df.csv')

# Fonction pour ignorer l'année et comparer seulement le jour et le mois
def date_matches(date, date_list):
    try:
        # Extraire le jour et le mois de la date fournie
        day_month = date.replace(year=1900)  # Ignore the year by setting it to a dummy value
        # Comparer la date (jour et mois) avec les dates de la liste
        return any(day_month.month == d.month and day_month.day == d.day for d in date_list)
    except Exception as e:
        print(f"Erreur dans la comparaison de dates : {e}")
        return False

@app.route('/')
def home():
    return "XGBoost Model Flask Service is Running!"

# Endpoint pour la prédiction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Récupérer les données JSON envoyées dans la requête POST
        data = request.json

        # Vérifier la validité des données reçues
        if not data or 'latitude' not in data or 'longitude' not in data or 'day_of_week' not in data or 'day' not in data or 'month' not in data or 'year' not in data or 'hour' not in data:
            return jsonify({"error": "Invalid input. Provide 'latitude', 'longitude', 'day_of_week', 'day', 'month', 'year', and 'hour'."}), 400

        # Extraire les caractéristiques depuis les données JSON
        latitude = data['latitude']
        longitude = data['longitude']
        day_of_week = data['day_of_week']
        day = data['day']
        month = data['month']
        year = data['year']
        hour = data['hour']

        # Convertir la date en objet datetime
        date = datetime(year, month, day)

        # Enrichir les données avec les jours fériés et événements spéciaux
        is_holiday = 1 if date_matches(date, pd.to_datetime(jours_nationaux['date']).dt.date.values) else 0
        is_religious_day = 1 if date_matches(date, pd.to_datetime(jours_religieux['date']).dt.date.values) else 0
        is_commercial_day = 1 if date_matches(date, pd.to_datetime(jours_commerciaux['date']).dt.date.values) else 0

        # Ajouter des informations sur les vacances scolaires
        is_vacances_ete = 1 if date_matches(date, pd.to_datetime(vacances_ete['date']).dt.date.values) else 0
        is_vacances_hiver = 1 if date_matches(date, pd.to_datetime(vacances_hiver['date']).dt.date.values) else 0
        is_vacances_printemps = 1 if date_matches(date, pd.to_datetime(vacances_printemps['date']).dt.date.values) else 0

        # Vérifier si la date correspond à un événement spécial
        is_special_event = 1 if date_matches(date, pd.to_datetime(evenements_speciaux['date']).dt.date.values) else 0

        temperature_avg = 15  # Température moyenne (peut être dynamique si nécessaire)

        # Ajouter ces caractéristiques enrichies aux données d'entrée
        features = {
            'latitude': latitude,  # Latitude fournie
            'longitude': longitude,  # Longitude fournie
            'year': year,
            'month': month,
            'day': day,
            'hour': hour,
            'day_of_week': day_of_week,
            'jours_nationaux': is_holiday,
            'jours_religieux': is_religious_day,
            'jours_commerciaux': is_commercial_day,
            'nom_vacances_Vacances d\'hiver': is_vacances_hiver,
            'nom_vacances_Vacances d\'été': is_vacances_ete,
            'nom_vacances_Vacances de printemps': is_vacances_printemps,
            'evenement_speciale': is_special_event,
            'tavg': temperature_avg  # Température moyenne (peut être dynamique)
        }

        # Convertir le dictionnaire de caractéristiques en DataFrame Pandas
        features_df = pd.DataFrame([features], columns=expected_columns)

        # Convertir le DataFrame en DMatrix (format requis par XGBoost)
        dfeatures = xgb.DMatrix(features_df)

        # Effectuer la prédiction
        prediction = model.predict(dfeatures)

        # Retourner la prédiction en format JSON
        return jsonify({"prediction": prediction.tolist()})

    except Exception as e:
        print(f"Erreur lors de la prédiction : {e}")
        return jsonify({"error": str(e)}), 500

# Lancer l'application Flask
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)  # API sera disponible sur le port 5001
