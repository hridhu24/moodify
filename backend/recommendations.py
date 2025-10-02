import requests

def get_anime_recommendation(mood):
    # Map moods to anime genres
    mood_genres = {
        "happy": "Slice of Life",
        "sad": "Drama",
        "neutral": "Comedy"
    }

    genre = mood_genres.get(mood, "Slice of Life")  # default genre

    url = "https://graphql.anilist.co"
    query = """
    query ($genre: String) {
      Page(perPage:5){
        media(genre:$genre, type: ANIME, sort: POPULARITY_DESC){
          title { romaji }
          siteUrl
          coverImage { large }
        }
      }
    }
    """
    variables = {"genre": genre}

    res = requests.post(url, json={"query": query, "variables": variables})
    data = res.json()

    # Debugging line (optional)
    # print(data)

    try:
        items = data["data"]["Page"]["media"]
        # Include 'image' in returned dict
        return [
            {
                "title": i["title"]["romaji"],
                "url": i["siteUrl"],
                "image": i["coverImage"]["large"]
            }
            for i in items
        ]
    except KeyError:
        return []
