tasks = [
    {"id": 1, "name": "UI 디자인", "status": "완료"},
    {"id": 2, "name": "API 개발", "status": "진행중"},
    {"id": 3, "name": "DB 설계", "status": "대기"}
]
members = {"UI 디자인": "Alice", "API 개발": "Charlie", "DB 설계": "Bob"}

def update_task_status(task_id, new_status):
    for task in tasks:
        if task["id"] == task_id:
            task["status"] = new_status
            break

def get_progress_rate():
    completed_count = 0
    for task in tasks:
        if task["status"] == "완료":
            completed_count += 1
    return (completed_count / len(tasks)) * 100