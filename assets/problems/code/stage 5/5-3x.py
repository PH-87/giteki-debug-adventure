
# 자동 파일 정리 시스템

def get_destination_folder(file_info, rules):
    if file_info['is_old']:
        return 'archive'
        
    for rule in rules:
        if file_info['type'] in rule['types'] or file_info['size_kb'] > rule['min_size_kb']:    # ❌ 오류 1: 파일 타입과 크기 조건이 모두 맞아야 하는데, 하나만 맞아도 규칙을 적용함
            return rule['destination']
            
    return "unsorted"

def generate_new_filepath(file_info, destination_folder):
    filename = file_info['type']    # ❌ 오류 2: 파일명이 아닌 파일 타입(type)을 사용하여 잘못된 경로를 생성 (e.g., /images/jpg)
    
    return f"/home/user/downloads/{destination_folder}/{filename}"

def create_move_plan(file_list, rules):
    move_plan = {}
    for file_obj in file_list:
        destination = get_destination_folder(file_obj, rules)
        
        move_plan[file_obj['name']] = generate_new_filepath(file_obj, destination) # ❌ 오류 3: 파일명을 키로 사용해야 하는데, 파일 객체 전체를 키로 사용하려 함
        
    return move_plan