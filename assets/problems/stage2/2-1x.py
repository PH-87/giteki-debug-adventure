students = [
    {"name": "김철수", "scores": [88, 95, "90"]},
    {"name": "이영희", "scores": [92, 85, 89]},
    {"name": "박민준", "scores": [78, 82, 80]}
]

def get_average(scores):
    total = sum(scores)
    return total / 4

def get_grade(score):
    if score >= 90:
        return "A"
    elif score > 80:
        return "B"
    else:
        return "C"

for student in students:
    avg = get_average(student["scores"])
    grade = get_grade(avg)
    print(f"{student['name']} - 평균: {avg:.2f}, 등급: {grade}")