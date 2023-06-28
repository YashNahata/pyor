from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/api/gas-used")
def gas_used():
    url = "https://api.dune.com/api/v1/query/2668809/results?api_key=opsejzfOoXvkvWF0mZQIwcoGbyRhE1OF"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        rows = data["result"]["rows"]
        obj = []
        for row in rows:
            obj.append({
                "value": row["gas_used"],
                "time": row["time"][0 : row["time"].index("T")]
            })
            res = jsonify(obj)
        return jsonify(obj)
    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"
