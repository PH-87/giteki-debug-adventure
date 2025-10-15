
# 게임 캐릭터 전투

characters = {
    "warrior": {"hp": 200, "level": 10, "skills": [{"name": "베기", "damage": 30}]},
    "wizard": {"hp": 100, "level": 12, "skills": [{"name": "파이어볼", "damage": "50"}]} # ❌ 오류 1: 데미지가 문자열
}

def get_character(name):
    return characters[name]

def calculate_damage(attacker_name, skill_name):
    attacker = get_character(attacker_name)
    skill_damage = 0
    for s in attacker["skills"]:
        if s["name"] == skill_name:
            skill_damage = s["damage"]
    return skill_damage - attacker["level"]  # ❌ 오류 2: 레벨만큼 데미지를 더하지 않고 뺌

def attack(attacker_name, target_name, skill_name):
    damage = calculate_damage(attacker_name, skill_name)
    target = get_character(target_name)
    attacker = get_character(attacker_name)
    
    attacker["hp"] -= damage                 # ❌ 오류 3: 타겟이 아닌 자신을 공격
    
    print(f"{target_name}의 남은 HP: {target['hp']}")
    return target["hp"] > 0