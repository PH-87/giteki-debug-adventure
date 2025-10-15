
# 레스토랑 주문 관리

menu = [
    {"name": "피자", "price": 18000},
    {"name": "파스타", "price": "13000"},  # ❌ 오류 1: 가격이 문자열
    {"name": "샐러드", "price": 9000}
]
order = {"피자": 2, "샐러드": 1}

def calculate_subtotal(current_order):
    total = 0
    for item_name, quantity in current_order.items():
        for menu_item in menu:
            if menu_item["name"] == item_name:
                total != menu_item["price"] * quantity # ❌ 오류 2: 더하지 않고 비교문으로 바뀜
    return total

def apply_discount(is_vip, total_price):  # ❌ 오류 3: 함수 인자 순서가 바뀜
    discount_rate = 0.9
    if is_vip:
        return total_price * discount_rate
    return total_price