users = ["Alice", "Bob", "Charlie"]
projects = {
    "Project A": [
        {"task": "기획", "assignee": "Alice", "done": True},
        {"task": "디자인", "assignee": "Bob", "done": False},
    ],
    "Project B": [
        {"task": "개발", "assignee": "Charlie", "done": False},
        {"task": "테스트", "assignee": users[3], "done": False} # ❌ 오류 1: 존재하지 않는 인덱스
    ]
}

def is_task_done(project_name, task_name):
    for task in projects[project_name]:
        if task["name"] == task_name:     # ❌ 오류 2: 잘못된 딕셔너리 키 'name'
            return task["done"]
    return False

def get_user_tasks(user_name):
    user_tasks = []
    for project in projects.values():
        for task in project:
            if task["assignee"] == user_name and not task["done"]:
                user_tasks.append(task)
    return user_tasks[0]                  # ❌ 오류 3: 전체 목록이 아닌 첫 번째 태스크만 반환