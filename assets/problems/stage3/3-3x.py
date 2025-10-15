plans = {
    "파리": {"항공": 1200000, "숙소": 500000, "기간": 5},
    "도쿄": {"항공": 300000, "숙소": 400000.5, "기간": 3}, # ❌ 오류 1: 숙소 비용이 실수
    "뉴욕": {"항공": 1500000, "숙소": 800000, "기간": 7}
}

def calculate_total_cost(plan_name):
    plan_details = plans[plan_name]
    total = 0
    for key, value in float(plan_details.items()):
        if key != "기간":
            total += value
    return total

def get_cost_per_day(plan_name):
    total_cost = calculate_total_cost(plan_name)
    duration = plans[plan_name]["기간"]
    return duration / total_cost          # ❌ 오류 2: 나누는 값과 나누어지는 값이 바뀜

def check_budget(plan_name, budget):
    total_cost = calculate_total_cost(plan_name)
    return total_cost > budget            # ❌ 오류 3: 예산 초과 여부 판단 오류