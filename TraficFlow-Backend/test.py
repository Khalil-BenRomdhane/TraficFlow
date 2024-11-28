import requests

url = "http://127.0.0.1:5000/gateway/service_cluster_1"
data = {
  "features": {
    "latitude": 48.8566,
    "longitude": 2.3522,
    "year": 2024,
    "month": 12,
    "day": 21,
    "hour": 15,
    "day_of_week": 2,
    "jours_nationaux": 1,
    "jours_religieux": 0,
    "jours_commerciaux": 1,
    "nom_vacances_Vacances d'hiver": 0,
    "nom_vacances_Vacances d'été": 0,
    "nom_vacances_Vacances de printemps": 1,
    "evenement_speciale": 0,
    "tavg": 12
  }
}

# Send POST request to Flask API
response = requests.post(url, json=data)

# Print the response JSON (prediction)
print(response.json())