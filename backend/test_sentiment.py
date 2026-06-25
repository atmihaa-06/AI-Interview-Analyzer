from transformers import pipeline

def analyze_sentiment(text):
    classifier = pipeline("sentiment-analysis")
    return classifier(text)