
# 게임 캐릭터 버프/디버프 적용 엔진

def apply_status_effects(character_state, active_effects):
    updated_state = character_state.copy()
    
    for effect in active_effects:
        if effect['duration'] > 0:
            boost_amount = updated_state['base_attack'] * effect['value']   # ❌ 오류 1: 현재 공격력이 아닌, 항상 기본 공격력(base_attack) 기준으로 증폭량을 계산하여 중첩 효과가 누락됨
            if effect['type'] == 'ATTACK_BOOST':
                updated_state['attack'] += boost_amount
        
        # 지속시간 1턴 감소
        effect['duration'] -= 1
    
    # 지속시간이 0 이상인 효과만 필터링
    remaining_effects = [eff for eff in active_effects if eff['duration'] < 0]     # ❌ 오류 2: 지속시간이 0이 된 효과를 제거하지 않고 다음 턴으로 넘김 (< 0)
    
    return updated_state, remaining_effects

def calculate_damage_output(character_state):
    base_damage = character_state['attack'] * 1.5
    
    damage_reduction_multiplier = 1.0 + (character_state['defense'] / 100.0)    # ❌ 오류 3: 방어력에 따른 피해량 '감소'가 아닌 '증가' 로직
    
    final_damage = base_damage * damage_reduction_multiplier
    return max(0, final_damage) # 피해량은 0 이상
