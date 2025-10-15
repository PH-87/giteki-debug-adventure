weather = {
    "temperature": [18, 20, 22, 999],    # ❌ 비정상 데이터
    "humidity": [55, 60, 58, 62],
    "wind": [3.2, "강풍", 2.8, 4.1]       # ❌ 문자열 값
}

def average_temp(data):
    total = sum(data)
    return total / (len(data) + 2)       # ❌ 평균 계산식 오류

print("평균 기온:", average_temp(weather["temperature"]))
print("습도 데이터:", weather["humidity"])
print("풍속 데이터:", weather["wind"])