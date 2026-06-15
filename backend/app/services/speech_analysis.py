def analyze_speech_pace(transcript, segments):

    total_words = len(transcript.split())

    if not segments:
        return {
            "wpm": 0,
            "rating": "Unknown"
        }

    duration_seconds = segments[-1]["end"]

    duration_minutes = duration_seconds / 60

    if duration_minutes == 0:
        return {
            "wpm": 0,
            "rating": "Unknown"
        }

    wpm = round(total_words / duration_minutes)

    if wpm < 100:
        rating = "Slow"
    elif wpm <= 160:
        rating = "Good"
    else:
        rating = "Fast"

    return {
        "total_words": total_words,
        "duration_seconds": round(duration_seconds, 2),
        "wpm": wpm,
        "rating": rating
    }