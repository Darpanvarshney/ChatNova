from flask import Blueprint, request, jsonify
from socket_instance import socketio

message_routes = Blueprint("message_routes", __name__)


@message_routes.route("/api/send-message", methods=["POST"])
def send_message():

    data = request.json

    sender = data["sender"]
    receiver = data["receiver"]
    message = data["message"]

    tx_hash = "0x" + str(abs(hash(message)))[:12]

    message_data = {
        "sender": sender,
        "receiver": receiver,
        "message": message,
        "tx_hash": tx_hash
    }

    # Send to receiver
    socketio.emit(
        "receive_message",
        message_data,
        room=receiver
    )

    # Send to government monitor
    socketio.emit(
        "government_monitor",
        message_data,
        room="government"
    )

    return jsonify({"tx_hash": tx_hash})