import re

FILLER_WORDS = [
    "um",
    "uh",
    "like",
    "actually",
    "basically",
    "you know"
]

def analyze_fillers(transcript):

    transcript = transcript.lower()

    filler_counts = {}

    total_fillers = 0

    for word in FILLER_WORDS:
        count = len(re.findall(rf"\b{re.escape(word)}\b", transcript))
        filler_counts[word] = count
        total_fillers += count

    return {
        "total_fillers": total_fillers,
        "details": filler_counts
    }