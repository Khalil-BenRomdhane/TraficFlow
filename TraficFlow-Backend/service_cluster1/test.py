import requests
import json

# URL de l'API Flask
url = "http://127.0.0.1:5000/gateway/predict"

# Données à envoyer dans la requête POST
data = {
    "latitude": 48.8566,  # Exemple de latitude (Paris)
    "longitude": 2.3522,  # Exemple de longitude (Paris)
    "day_of_week": 1,     # Lundi (0 = dimanche, 1 = lundi, ...)
    "day": 2,            # Jour de la demande
    "month": 1,          # Mois de novembre
    "year": 2024,         # Année de la demande
    "hour": 14            # Heure de la demande
}

# Envoi de la requête POST avec les données JSON
response = requests.post(url, json=data)
# Si la réponse est JSON, essayer de l'analyser
try:
    response_json = response.json()
    print("Réponse JSON :", json.dumps(response_json, indent=4))
except ValueError as e:
    print("Erreur lors de la conversion en JSON:", str(e))
