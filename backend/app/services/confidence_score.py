import joblib
import os

MODEL_PATH = os.path.join(
    os.path.dirname(
        os.path.dirname(
            os.path.dirname(__file__)
        )
    ),
    "confidence_model.pkl"
)

model = joblib.load(MODEL_PATH)


def calculate_confidence_score(
    communication_score,
    eye_contact_percent,
    speech_pace,
    filler_count
):

    prediction = model.predict([
        [
            eye_contact_percent,
            communication_score,
            speech_pace,
            filler_count
        ]
    ])[0]

    score = round(
        float(prediction),
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