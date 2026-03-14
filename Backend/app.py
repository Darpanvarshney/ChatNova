from flask import Flask
from flask_cors import CORS
from flask_socketio import join_room

from socket_instance import socketio

from routes.message_routes import message_routes
from routes.user_routes import user_routes

app = Flask(__name__)
CORS(app)

socketio.init_app(app)

app.register_blueprint(message_routes)
app.register_blueprint(user_routes)


@socketio.on("join")
def handle_join(data):
    user_id = data.get("userId")
    if not user_id:
        print("JOIN event missing userId")
        return

    join_room(user_id)
    print(f"USER JOINED ROOM: '{user_id}'")


@socketio.on("government_join")
def government_join():

    join_room("government")

    print("Government connected")


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)