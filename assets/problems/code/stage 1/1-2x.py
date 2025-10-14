
# 쇼핑몰 주문 시스템

orders = [
    {"id": 101, "item": "노트북", "quantity": 2},
    {"id": 102, "item": "마우스", "quantity": -3},  # ❌ 음수 주문
    {"id": 103, "item": "키보드", "quantity": 1}
]

def total_items(orders):
    return sum([o["quantity"] for o in orders])

delivery_fee = 3000
if total_items(orders) > 5:
    delivery_fee = "무료배송"            # ❌ 타입 불일치

print("총 주문 수량:", total_items(orders))
print("배송비:", delivery_fee)

discount_rate = 1.2                      # ❌ 할인율 1.0 이상 불가능
print("할인율:", discount_rate)