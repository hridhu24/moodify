import requests

def get_anime_recommendation(mood):
    # Map moods to anime genres
    mood_genres = {
    "happy": "Slice of Life",
    "sad": "Drama",
    "neutral": "Comedy"
}

    genre = mood_genres.get(mood, "slice_of_life")
    
    url = "https://graphql.anilist.co"
    query = """
    query ($genre: String) {
      Page(perPage:5){
        media(genre:$genre, type: ANIME, sort: POPULARITY_DESC){
          title { romaji }
          siteUrl
        }
      }
    }
    """
    variables = {"genre": genre}
    
    res = requests.post(url, json={"query": query, "variables": variables})
    # items = res.json()["data"]["Page"]["media"]
    # return [{"title": i["title"]["romaji"], "url": i["siteUrl"]} for i in items]

    data = res.json()

    # Debugging line to see response
    print(data)

    try:
        items = data["data"]["Page"]["media"]
        return [{"title": i["title"]["romaji"], "url": i["siteUrl"]} for i in items]
    except KeyError:
        return []
