surveys = [
    {"id": 1, "question": "선호하는 계절은?", "responses": 
     ["여름", "겨울", "여름"]},
    {"id": 2, "question": "선호하는 동물은?", "responses": 
     ["고양이", 100, "강아지"]}] # ❌ 오류 1: 응답이 숫자

def get_survey(survey_id):
    for survey in surveys:
        if survey["id"] == survey_id:
            return survey

def add_response(survey_id, response):
    survey = get_survey(survey_id)
    if survey:
        survey["responses"].add(response) # ❌ 오류 2: 리스트에 잘못된 함수 '.add' 사용

def get_response_summary(survey_id):
    survey = get_survey(survey_id)
    summary = {}
    for response in survey["responses"]:
        if response in summary:
            summary[response] += 1
        else:
            summary[response] = 0         # ❌ 오류 3: 응답 횟수 초기값이 0
    return summary