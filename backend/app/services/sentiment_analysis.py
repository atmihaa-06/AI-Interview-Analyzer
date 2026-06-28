from transformers import pipeline

classifier = None

def get_classifier():
    global classifier

    if classifier is None:
        classifier = pipeline(
            "sentiment-analysis",
            model="distilbert-base-uncased-finetuned-sst-2-english",
            framework="pt"
        )

    return classifier


def analyze_sentiment(text):
    model = get_classifier()

    result = model(text[:512])

    return {
        "label": result[0]["label"],
        "score": round(result[0]["score"] * 100, 2)
    }