import requests

# Replace with the actual URL of your Flask server
server_url = "http://127.0.0.1:5010/search"  # Default Flask development server address
search_endpoint = f"{server_url}/search"

# Define the search query
query = "ger"

# Make a GET request to the search endpoint
response = requests.post("http://127.0.0.1:5000/gateway/search", json={"q": query})

# Check the response status
if response.status_code == 200:
    print("Search Results:")
    results = response.json()
    print(results)
else:
    print(f"Error: Received status code {response.status_code}")
    print(f"Response content: {response.text}")
