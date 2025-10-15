
# 학생 수강신청 시스템

students = {
    "S01": {"name": "김학생", "major": "CS", "courses": ["CS101"]},
    "S02": {"name": "이학생", "major": "EE", "courses": []}
}
courses = {
    "CS101": {"name": "컴퓨터 과학 입문", "credits": 3},
    "EE201": {"name": "회로이론", "credits": 3},
    "CS303": {"name": "알고리즘", "credits": 3}
}

def enroll(student_id, course_id):
    if course_id in courses:
        students[student_id]["courses"].append(course_id)
        return True
    return False

def get_total_credits(student_id):
    total = 0
    course_list = students[student_id]["courses"]
    for course_id in course_list:
        total += courses[course_id]["credits"]
    return total