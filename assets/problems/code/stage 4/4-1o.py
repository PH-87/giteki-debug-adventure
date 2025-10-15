
# 재고 관리 시스템 (중첩 구조)

inventory = {
    "electronics": [
        {"id": "E01", "name": "노트북", "stock": 10},
        {"id": "E02", "name": "마우스", "stock": 50},
    ],
    "books": [ {"id": "B01", "name": "파이썬", "stock": 50} ]
}

def find_item(item_id):
    for category, items in inventory.items():
        for item in items:
            if item["id"] == item_id:
                return item
    return None

def restock(item_id, quantity):
    item = find_item(item_id)
    if item:
        item["stock"] += quantity
    return item

def get_category_stock(category_name):
    total = 0
    items = inventory[category_name]
    for item in items:
        total += item["stock"]
    return total