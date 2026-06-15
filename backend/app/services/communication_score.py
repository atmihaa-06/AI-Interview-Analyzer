def calculate_communication_score(
    filler_count,
    wpm
):

    # -----------------------
    # Filler Score (50)
    # -----------------------
    if filler_count == 0:
        filler_score = 50
    elif filler_count <= 3:
        filler_score = 40
    elif filler_count <= 7:
        filler_score = 30
    else:
        filler_score = 15

    # -----------------------
    # Speech Pace Score (50)
    # -----------------------
    if 100 <= wpm <= 160:
        pace_score = 50
    elif 80 <= wpm < 100 or 160 < wpm <= 180:
        pace_score = 40
    else:
        pace_score = 25

    total_score = filler_score + pace_score

    # -----------------------
    # Grade
    # -----------------------
    if total_score >= 90:
        grade = "A+"
    elif total_score >= 80:
        grade = "A"
    elif total_score >= 70:
        grade = "B"
    elif total_score >= 60:
        grade = "C"
    else:
        grade = "D"

    return {
        "score": total_score,
        "grade": grade,
        "filler_score": filler_score,
        "pace_score": pace_score
    }