def calculate_path_cost(path, traffic_conditions):
    total_cost = 0.0
    for segment in path:
        traffic_multiplier = traffic_conditions.get(segment['road_id'], 1.0)
        segment_cost = segment['distance'] * traffic_multiplier
        total_cost += segment_cost
    
    return total_cost

def find_optimal_route(available_paths, traffic_conditions, vehicle_spec):
    best_route = None
    min_cost = float('inf')

    for path in available_paths:
        total_distance = sum(s['distance'] for s in path)
        if total_distance > vehicle_spec['max_range']:
            continue

        path_cost = calculate_path_cost(path, traffic_conditions)

        if path_cost < min_cost:
            min_cost = path_cost
            best_route = path
            
    return best_route, min_cost