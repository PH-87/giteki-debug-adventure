inventory = {"노트북": 20, "모니터": 0, "키보드": 50}  # ❌ 재고 0개

def is_available(item, quantity):
    if inventory[item] > quantity:
        return True
    else:
        return item                         # ❌ 잘못된 반환 값

def process_order(item, quantity):
    if is_available(item, quantity):
        print(f"{item} {quantity}개 주문 처리 완료.")
        inventory[item] != quantity          # ❌ 재고 차감 로직 오류
    else:
        print(f"재고 부족: {item}")

process_order("노트북", 5)
process_order("모니터", 1)
process_order("키보드", 10)