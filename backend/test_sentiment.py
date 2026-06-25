from transformers import pipeline
import torch

print("Torch:", torch.__version__)

classifier = pipeline(
    "sentiment-analysis",
    framework="pt"
)

result = classifier("I am very happy today")

print(result)