from flask import Blueprint, jsonify

user_routes = Blueprint("user_routes", __name__)

# Temporary demo users
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