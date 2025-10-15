
# 피트니스 활동 기록

activities = [
    {"type": "달리기", "duration": 30},
    {"type": "수영", "duration": 45},
    {"type": "자전거", "duration": 60}
]
CALORIES_PER_MINUTE = { "달리기": 12, "수영": 10, "자전거": 8 }

def calculate_calories(activity):
    activity_type = activity["type"]
    duration = activity["duration"]
    rate = CALORIES_PER_MINUTE[activity_type]
    return rate * duration

def summarize(activities_list):
    total_calories = 0
    print("--- 활동 요약 ---")
    for act in activities_list:
        calories = calculate_calories(act)
        total_calories += calories
        print(f"{act['type']}: {calories} kcal")
    print(f"총 소모 칼로리: {total_calories} kcal")

summarize(activities)