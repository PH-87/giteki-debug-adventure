
# 쇼핑몰 주문 시스템

orders = [
    {"id": 101, "item": "노트북", "quantity": 2},
    {"id": 102, "item": "마우스", "quantity": 3},
    {"id": 103, "item": "키보드", "quantity": 1}
]

def total_items(orders):
    return sum([o["quantity"] for o in orders])

delivery_fee = 3000
if total_items(orders) > 5:
    delivery_fee = 0

print("총 주문 수량:", total_items(orders))
print("배송비:", delivery_fee)

discount_rate = 0.2
print("할인율:", discount_rate)