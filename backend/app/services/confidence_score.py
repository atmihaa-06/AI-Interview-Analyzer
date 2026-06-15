def calculate_confidence_score(
    communication_score,
    eye_contact_percent
):

    score = round(
        (
            communication_score +
            eye_contact_percent
        ) / 2,
        2
    )

    if score >= 85:
        rating = "High"

    elif score >= 70:
        rating = "Moderate"

    else:
        rating = "Low"

    return {
        "score": score,
        "rating": rating
    }