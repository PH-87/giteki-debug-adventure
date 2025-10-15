movies = {
    "어벤져스": {"price": 12000, "limit": 15},
    "토이스토리": {"price": 10000, "limit": 7},
    "기생충": {"price": 13000, "limit": 19}
}

def check_age(age, movie_title):
    limit = movies[movie_title]["limit"]
    if age >= limit:
        return True
    else:
        return False

def get_total_price(movie_title, count):
    price = movies[movie_title]["price"]
    return price * count

customer_age = 19
movie = "기생충"
if check_age(customer_age, movie):
    total = get_total_price(movie, 2)
    print(f"총 결제 금액: {total}원")