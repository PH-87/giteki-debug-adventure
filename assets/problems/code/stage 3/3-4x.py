
# 중고 거래 시스템

products = [
    {"id": 101, "name": "자전거", "price": 150000, "SOLD": True}, # ❌ 오류 1: 딕셔너리 키 오타
    {"id": 102, "name": "의자", "price": 40000, "sold": False},
    {"id": 103, "name": "책상", "price": 80000, "sold": False}
]

def search_by_price(max_price):
    results = []
    for p in products:
        if p["price"] >= max_price and p["sold"] == False: # ❌ 오류 2: 가격 비교 연산자 오류
            results.append(p)
    return results

def mark_as_sold(product_id):
    for p in products:
        if p["id"] == product_id:
            p["sold"] = "판매완료"       # ❌ 오류 3: 상태 값이 문자열