class Message:

    def __init__(self, sender, receiver, encrypted, ipfs_hash, tx_hash):
        self.sender = sender
        self.receiver = receiver
        self.encrypted = encrypted
        self.ipfs_hash = ipfs_hash
        self.tx_hash = tx_hash