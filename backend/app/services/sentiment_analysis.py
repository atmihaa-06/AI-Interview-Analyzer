from transformers import pipeline
import torch

classifier = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english",
    framework="pt"
)

def analyze_sentiment(text):

    result = classifier(text[:512])

    return {
        "label": result[0]["label"],
        "score": round(result[0]["score"] * 100, 2)
    }