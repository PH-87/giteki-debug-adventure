products = [
    {"id": 101, "name": "자전거", "price": 150000, "sold": True},
    {"id": 102, "name": "의자", "price": 40000, "sold": False},
    {"id": 103, "name": "책상", "price": 80000, "sold": False}
]

def search_by_price(max_price):
    results = []
    for p in products:
        if p["price"] <= max_price and p["sold"] == False:
            results.append(p)
    return results

def mark_as_sold(product_id):
    for p in products:
        if p["id"] == product_id:
            p["sold"] = True