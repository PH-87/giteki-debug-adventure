inventory = {"노트북": 20, "모니터": 15, "키보드": 50}

def is_available(item, quantity):
    if inventory[item] > quantity:
        return True
    else:
        return False

def process_order(item, quantity):
    if is_available(item, quantity):
        print(f"{item} {quantity}개 주문 처리 완료.")
        inventory[item] -= quantity
    else:
        print(f"재고 부족: {item}")

process_order("노트북", 5)
process_order("모니터", 1)
process_order("키보드", 10)