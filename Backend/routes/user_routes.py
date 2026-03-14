from flask import Blueprint, jsonify, request
from socket_instance import socketio

user_routes = Blueprint("user_routes", __name__)

# In-memory user store; persisted only while server runs
users = [
    {
        "anonymousId": "anon_001",
        "displayName": "Anonymous User 1"
    },
    {
        "anonymousId": "anon_002",
        "displayName": "Anonymous User 2"
    },
    {
        "anonymousId": "anon_003",
        "displayName": "Anonymous User 3"
    }
]

@user_routes.route("/api/users", methods=["GET"])
def get_users():
    return jsonify(users)

@user_routes.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json() or {}
    anonymous_id = data.get("anonymousId")
    display_name = data.get("displayName") or data.get("username") or "Anonymous User"

    if not anonymous_id:
        return jsonify({"error": "anonymousId is required"}), 400

    for u in users:
        if u.get("anonymousId") == anonymous_id:
            return jsonify(u), 200

    new_user = {
        "anonymousId": anonymous_id,
        "displayName": display_name
    }
    users.append(new_user)
    # Notify all connected clients that a new user joined
    socketio.emit("user_joined", new_user)
    return jsonify(new_user), 201