
# 블로그 포스트 관리

posts = [
    {"id": 1, "author": "Kim", "likes": 50},
    {"id": 2, "author": "Lee", "likes": 120},
    {"id": 3, "author": "Park", "likes": -5}, # ❌ 오류 1: '좋아요'가 음수
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
    post["comments"] = comment            # ❌ 오류 2: 댓글을 추가하는 대신 덮어씀

def get_popular_posts(like_threshold):
    popular = []
    for p in posts:
        if p["likes"] < like_threshold:   # ❌ 오류 3: 인기글을 찾는 조건식 오류
            popular.append(p)
    return popular