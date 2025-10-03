import requests

MOOD_GENRES = {
    "happy": "Slice of Life",
    "sad": "Drama",
    "neutral": "Comedy"
}

def get_anime_by_mood(mood: str):
    genre = MOOD_GENRES.get(mood.lower(), "Slice of Life")
    url = "https://graphql.anilist.co"

    query = """
    query ($genre: String) {
      Page(perPage:5){
        media(genre:$genre, type: ANIME, sort: POPULARITY_DESC){
          title { romaji english }
          siteUrl
          coverImage { large }
        }
      }
    }
    """
    variables = {"genre": genre}
    res = requests.post(url, json={"query": query, "variables": variables})
    data = res.json()

    try:
        items = data["data"]["Page"]["media"]
        return [
            {
                "title": i["title"]["english"] or i["title"]["romaji"],
                "url": i["siteUrl"],
                "image": i["coverImage"]["large"]
            }
            for i in items
        ]
    except KeyError:
        return []
