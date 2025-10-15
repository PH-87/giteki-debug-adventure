plans = {
    "파리": {"항공": 1200000, "숙소": 500000, "기간": 5},
    "도쿄": {"항공": 300000, "숙소": 400000, "기간": 3},
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
    return total_cost / duration

def check_budget(plan_name, budget):
    total_cost = calculate_total_cost(plan_name)
    return total_cost <= budget