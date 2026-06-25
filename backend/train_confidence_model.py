import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

data = pd.DataFrame({
    "eye_contact": [95,90,85,80,70,60,50,40],
    "communication": [92,88,85,78,72,65,55,45],
    "speech_pace": [130,135,140,150,160,170,180,190],
    "fillers": [2,3,5,7,10,15,20,25],
    "confidence": [95,90,88,80,75,65,55,45]
})

X = data[
    [
        "eye_contact",
        "communication",
        "speech_pace",
        "fillers"
    ]
]

y = data["confidence"]

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

joblib.dump(
    model,
    "confidence_model.pkl"
)

print(
    "Model trained successfully!"
)