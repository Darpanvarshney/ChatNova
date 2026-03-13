from flask import Blueprint, jsonify
import uuid

auth_routes = Blueprint("auth_routes", __name__)


@auth_routes.route("/api/create-user")
def create_user():

    user_id = "anon_" + str(uuid.uuid4())[:8]

    return jsonify({
        "user_id": user_id
    })