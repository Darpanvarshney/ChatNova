from web3 import Web3
from config import BLOCKCHAIN_NODE

w3 = Web3(Web3.HTTPProvider(BLOCKCHAIN_NODE))


def store_hash(ipfs_hash):

    # For now we simulate transaction
    tx_hash = w3.keccak(text=ipfs_hash).hex()

    return tx_hash