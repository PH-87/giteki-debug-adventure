posts = [
    {"id": 1, "author": "Kim", "likes": 50},
    {"id": 2, "author": "Lee", "likes": 120},
    {"id": 3, "author": "Park", "likes": 5},
]

def find_post_by_id(post_id):
    for p in posts:
        if p["id"] == post_id:
            return p
    return None

def add_comment(post_id, comment):
    post = find_post_by_id(post_id)
    if "comments" not in post:
        post["comments"] = []
    post["comments"].append(comment)

def get_popular_posts(like_threshold):
    popular = []
    for p in posts:
        if p["likes"] >= like_threshold:
            popular.append(p)
    return popular