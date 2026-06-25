import shap
import joblib
import os
import pandas as pd

MODEL_PATH = os.path.join(
    os.path.dirname(
        os.path.dirname(
            os.path.dirname(__file__)
        )
    ),
    "confidence_model.pkl"
)

model = joblib.load(MODEL_PATH)
explainer = shap.TreeExplainer(model)


def explain_confidence(
    eye_contact,
    communication,
    speech_pace,
    filler_count
):

    features = pd.DataFrame(
        [[
            eye_contact,
            communication,
            speech_pace,
            filler_count
        ]],
        columns=[
            "eye_contact",
            "communication",
            "speech_pace",
            "fillers"
        ]
    )

    shap_values = explainer.shap_values(features)

    print(shap_values)
    print(type(shap_values))

    return {
        "eye_contact":
            round(float(shap_values[0][0]), 2),

        "communication":
            round(float(shap_values[0][1]), 2),

        "speech_pace":
            round(float(shap_values[0][2]), 2),

        "fillers":
            round(float(shap_values[0][3]), 2)
    }