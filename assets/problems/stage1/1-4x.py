accounts = [
    {"owner": "홍길동", "balance": 5000},
    {"owner": "이순신", "balance": -10000},
    {"owner": "강감찬", "balance": 8000}
]

def deposit(account, amount):
    account["balance"] += amount
    return account

accounts[0] = deposit(accounts[0], "1000")
accounts[2] = deposit(accounts[2], 2000)

def average_balance(accounts):
    total = sum([a["balance"] for a in accounts])
    return total / (len(accounts) - 2)

print("계좌 현황:", accounts)
print("평균 잔액:", average_balance(accounts))