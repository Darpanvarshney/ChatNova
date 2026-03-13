danger_words = [
    "bomb",
    "attack",
    "kill",
    "weapon",
    "explosion"
]

def detect_threat(message):

    for word in danger_words:
        if word in message.lower():
            return True

    return False