def get_destination_folder(file_info, rules):
    if file_info['is_old']:
        return 'archive'
        
    for rule in rules:
        if file_info['type'] in rule['types'] \
            and file_info['size_kb'] > rule['min_size_kb']:
            return rule['destination']
            
    return "unsorted"

def generate_new_filepath(file_info, destination_folder):
    filename = file_info['name']
    
    return f"/home/user/downloads/{destination_folder}/{filename}"

def create_move_plan(file_list, rules):
    move_plan = {}
    for file_obj in file_list:
        destination = get_destination_folder(file_obj, rules)

        move_plan[file_obj] = generate_new_filepath(file_obj, destination)
        
    return move_plan