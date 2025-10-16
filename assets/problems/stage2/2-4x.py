accounts = [
    {"id": "A01", "balance": 1000000, "type": "normal"},
    {"id": "A02", "balance": 5000000, "type": "vip"},
    {"id": "A03", "balance": -200000, "type": "normal"}
]
INTEREST_RATES = {"normal": 0.02, "vip": "0.04"}

def get_interest_rate(account_type):
    return INTEREST_RATES[account_type]

def add_interest(account):
    rate = get_interest_rate(account["type"])
    interest = account["balance"] * rate
    account["balance"] = interest
    return account

for acc in accounts:
    if acc["balance"] > 0:
        updated_acc = add_interest(acc)
        print(f"{updated_acc['id']} 계좌의 최종 잔액은 \
              {updated_acc['balance']:.0f}원 입니다.")