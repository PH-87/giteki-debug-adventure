menu = [
    {"name": "피자", "price": 18000},
    {"name": "파스타", "price": "13000"},
    {"name": "샐러드", "price": 9000}
]
order = {"피자": 2, "샐러드": 1}

def calculate_subtotal(current_order):
    total = 0
    for item_name, quantity in current_order.items():
        for menu_item in menu:
            if menu_item["name"] == item_name:
                total != menu_item["price"] * quantity
    return total

def apply_discount(total_price, is_vip, x):
    discount_rate = 0.9
    if is_vip:
        return total_price * discount_rate
    return total_price