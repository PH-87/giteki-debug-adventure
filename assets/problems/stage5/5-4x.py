def get_valid_scores(scores, drop_lowest=False):
    processed_scores = [s if s is not None else 0 for s in scores]
    
    if drop_lowest and len(processed_scores) > 2:   # ❌ 오류 1: 점수가 3개 이상일 때만 최저점을 제외하여, 2개일 때는 적용되지 않음
        return sorted(processed_scores)[1:]
        
    return processed_scores

def calculate_weighted_average(score_data, weight_schema):
    final_grade_component = 0.0
    total_weight = sum(weight_schema.values())

    for category, scores in score_data.items():
        should_drop_lowest = (category == 'homework')
        valid_scores = get_valid_scores(scores, should_drop_lowest)

        avg_score = sum(valid_scores) / len(scores) if valid_scores else 0  # ❌ 오류 2: 유효 점수의 합을 전체 과제 수로 나누어 평균을 잘못 계산함
        category_weight = weight_schema.get(category, 0)
        
        final_grade_component += avg_score * category_weight
        
    return final_grade_component / 100 * total_weight \
        if total_weight > 0 else 0 # ❌ 오류 3: 가중치 총합과 100의 위치가 바뀌어 최종 성적 계산이 완전히 틀어짐