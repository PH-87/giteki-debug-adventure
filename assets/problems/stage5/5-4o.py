def get_valid_scores(scores, drop_lowest=False):
    processed_scores = [s if s is not None else 0 for s in scores]
    
    if drop_lowest and len(processed_scores) > 1:
        return sorted(processed_scores)[1:]
        
    return processed_scores

def calculate_weighted_average(score_data, weight_schema):
    final_grade_component = 0.0
    total_weight = sum(weight_schema.values())

    for category, scores in score_data.items():
        should_drop_lowest = (category == 'homework')
        valid_scores = get_valid_scores(scores, should_drop_lowest)
        
        avg_score = sum(valid_scores) / len(valid_scores) if valid_scores else 0
        category_weight = weight_schema.get(category, 0)
        
        final_grade_component += avg_score * category_weight
        
    return final_grade_component / total_weight * 100 \
        if total_weight > 0 else 0