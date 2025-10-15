
# 게임 캐릭터 전투

characters = {
    "warrior": {"hp": 200, "level": 10, "skills": [{"name": "베기", "damage": 30}]},
    "wizard": {"hp": 100, "level": 12, "skills": [{"name": "파이어볼", "damage": 50}]}
}

def get_character(name):
    return characters[name]

def calculate_damage(attacker_name, skill_name):
    attacker = get_character(attacker_name)
    skill_damage = 0
    for s in attacker["skills"]:
        if s["name"] == skill_name:
            skill_damage = s["damage"]
    return skill_damage + attacker["level"]

def attack(attacker_name, target_name, skill_name):
    damage = calculate_damage(attacker_name, skill_name)
    target = get_character(target_name)
    attacker = get_character(attacker_name)
    
    target["hp"] -= damage
    
    print(f"{target_name}의 남은 HP: {target['hp']}")
    return target["hp"] > 0