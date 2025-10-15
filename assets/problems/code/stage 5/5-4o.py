
# 가중 평균 성적 계산 시스템

def get_valid_scores(scores, drop_lowest=False):
    processed_scores = [s if s is not None else 0 for s in scores]
    
    # 점수가 2개 이상일 때 최저점을 제외해야 함
    if drop_lowest and len(processed_scores) > 1:
        return sorted(processed_scores)[1:]
        
    return processed_scores

def calculate_weighted_average(score_data, weight_schema):
    final_grade_component = 0.0
    total_weight = sum(weight_schema.values())

    for category, scores in score_data.items():
        # 'homework' 카테고리일 때만 최저점 제외 옵션 활성화
        should_drop_lowest = (category == 'homework')
        valid_scores = get_valid_scores(scores, should_drop_lowest)
        
        # 유효한 과제 수로만 나누어 정확한 평균을 계산
        avg_score = sum(valid_scores) / len(valid_scores) if valid_scores else 0
        category_weight = weight_schema.get(category, 0)
        
        final_grade_component += avg_score * category_weight
        
    # 가중치 총합으로 나누어 100점 만점 기준으로 최종 성적을 계산
    return final_grade_component / total_weight * 100 if total_weight > 0 else 0