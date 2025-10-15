
# 프로젝트 태스크 관리

users = ["Alice", "Bob", "Charlie"]
projects = {
    "Project A": [
        {"task": "기획", "assignee": "Alice", "done": True},
        {"task": "디자인", "assignee": "Bob", "done": False},
    ],
    "Project B": [
        {"task": "개발", "assignee": "Charlie", "done": False},
        {"task": "테스트", "assignee": "Alice", "done": False}
    ]
}

def is_task_done(project_name, task_name):
    for task in projects[project_name]:
        if task["task"] == task_name:
            return task["done"]
    return False

def get_user_tasks(user_name):
    user_tasks = []
    for project in projects.values():
        for task in project:
            if task["assignee"] == user_name and not task["done"]:
                user_tasks.append(task)
    return user_tasks