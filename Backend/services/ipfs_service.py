import requests
from config import IPFS_API, PINATA_API_KEY, PINATA_SECRET_KEY


def upload_to_ipfs(data):

    headers = {
        "pinata_api_key": PINATA_API_KEY,
        "pinata_secret_api_key": PINATA_SECRET_KEY
    }

    payload = {
        "message": data
    }

    response = requests.post(IPFS_API, json=payload, headers=headers)

    return response.json()["IpfsHash"]