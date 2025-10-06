# test_model.py
from advanced_emotion import load_model, predict_emotion

def main():
    print("🚀 Loading DistilBERT model...")
    load_model()
    print("✅ Model loaded successfully!\n")

    # Test some sample sentences
    samples = [
        "I feel so relaxed today.",
        "I'm really angry about what happened!",
        "I'm anxious about my exams.",
        "Life is good and I'm happy!",
        "I'm feeling lonely and sad.",
        "Let's go! I'm so pumped for this!",
    ]

    for text in samples:
        result = predict_emotion(text)
        print(f"🧠 Text: {text}")
        print(f"   → Label: {result['label']}")
        print(f"   → Mood:  {result['mood']}")
        print(f"   → Top Scores: {sorted(result['scores'].items(), key=lambda x: x[1], reverse=True)[:3]}\n")

if __name__ == "__main__":
    main()
