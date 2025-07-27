from flask import Flask


app = Flask(__name__)
DEBUG_SERVER = True
SERVER_PORT = 5000


from views import *

if __name__ == "__main__":
    app.run(
        host="0.0.0.0", port=SERVER_PORT, debug=DEBUG_SERVER
    )  # Optional: enable debug mode
    # app.run(host="0.0.0.0", port=SERVER_PORT)
