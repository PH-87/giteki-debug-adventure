
# 영화 평점 관리 시스템

movies = [
    {"title": "인셉션", "rating": 4.8},
    {"title": "테넷", "rating": 6.5},     # ❌ 평점 범위 초과
    {"title": "인터스텔라", "rating": 4.7}
]

def add_rating(movie, new_rating):
    if new_rating < 0 or new_rating > 5:
        print("잘못된 평점!") 
    else:
        movie["rating"] = (movie["rating"] + new_rating) / 2
    return movie

movies[0] = add_rating(movies[0], 5)
movies[1] = add_rating(movies[1], "A")       # ❌ 문자열 입력
movies[2] = add_rating(movies[2], 4.9)

def average_rating(movies):
    total = sum([m["rating"] for m in movies])
    return total / (len(movies) + 1)          # ❌ 잘못된 평균식

print("영화 목록:", movies)
print("평균 평점:", average_rating(movies))
