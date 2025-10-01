from nltk.sentiment.vader import SentimentIntensityAnalyzer

sia = SentimentIntensityAnalyzer()

def get_mood(text):
    scores = sia.polarity_scores(text)
    compound = scores['compound']
    
    if compound >= 0.05:
        return "happy"
    elif compound <= -0.05:
        return "sad"
    else:
        return "neutral"
