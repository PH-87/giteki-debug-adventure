
# 영화 예매 시스템

movies = {
    "어벤져스": {"price": 12000, "limit": 15},
    "토이스토리": {"price": 10000, "limit": "전체이용가"},   # ❌ 연령 제한 타입 오류
    "기생충": {"price": 13000, "limit": 19}
}

def check_age(age, movie_title):
    limit = movies[movie_title]["limit"]
    if age > limit:                             # ❌ 조건문 비교 연산자 오류
        return True
    else:
        return False

def get_total_price(movie_title, count):
    price = movies[movie_title]["price"]
    return price + count                        # ❌ 가격 계산 로직 오류

customer_age = 19
movie = "기생충"
if check_age(customer_age, movie):
    total = get_total_price(movie, 2)
    print(f"총 결제 금액: {total}원")