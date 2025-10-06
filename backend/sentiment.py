from nltk.sentiment.vader import SentimentIntensityAnalyzer

sia = SentimentIntensityAnalyzer()

def get_mood(text):
    if not text.strip():
        return "neutral"
    
    scores = sia.polarity_scores(text)
    compound = scores['compound']
    
    if compound >= 0.05:
        return "happy"
    elif compound <= -0.05:
        return "sad"
    else:
        return "neutral"
    
def normalize_vader_output(label: str) -> str:
    """
    Convert VADER-style labels into the same unified set
    as the DistilBERT model mapping.
    """
    mapping = {
        "positive": "happy",
        "negative": "sad",
        "neutral": "neutral",
    }
    return mapping.get(label.lower(), "neutral")
