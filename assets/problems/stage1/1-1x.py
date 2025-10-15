books = [
    {"title": "파이썬 입문", "pages": 320, "price": 15000},
    {"title": "데이터 과학", "pages": 0, "price": 28000},
    {"title": "머신러닝", "pages": 450, "price": 30000}
]

def average_price(books):
    total = sum([b["price"] for b in books])
    return total / (len(books) - 1)

stock = {
    "파이썬 입문": 12,
    "데이터 과학": "다섯 권",
    "머신러닝": 5
}

print("평균 가격:", average_price(books))
print("재고 현황:", stock)