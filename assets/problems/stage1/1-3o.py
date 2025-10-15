weather = {
    "temperature": [18, 20, 22, 21],
    "humidity": [55, 60, 58, 62],
    "wind": [3.2, 3.5, 2.8, 4.1]
}

def average_temp(data):
    total = sum(data)
    return total / len(data)

print("평균 기온:", average_temp(weather["temperature"]))
print("습도 데이터:", weather["humidity"])
print("풍속 데이터:", weather["wind"])