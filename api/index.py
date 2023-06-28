from flask import Flask, jsonify, request
from flask_cors import CORS
import requests, time, datetime

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

@app.route("/api/block-numbers", methods = ['POST'])
def block_numbers():
    date = request.json['date']
    year = int(date[0:4])
    month = int(date[5:7])
    day = int(date[8:])
    unix_timestamp_1 = int(time.mktime(datetime.datetime(year, month, day, 0, 0).timetuple()))
    unix_timestamp_2 = int(time.mktime(datetime.datetime(year, month, day, 23, 59, 59).timetuple()))
    url1 = f"https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp={unix_timestamp_1}&closest=before&apikey=CZE5M66GGG4VEWACQKJZ56JNJ7G44YMU2Z"
    url2 = f"https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp={unix_timestamp_2}&closest=before&apikey=CZE5M66GGG4VEWACQKJZ56JNJ7G44YMU2Z"
    try:
        obj = {}
        response1 = requests.get(url1)
        response1.raise_for_status()
        data1 = response1.json()
        obj["first"] = data1["result"]

        response2 = requests.get(url2)
        response2.raise_for_status()
        data2 = response2.json()
        obj["last"] = data2["result"]

        res = jsonify(obj)
        return res
    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"
