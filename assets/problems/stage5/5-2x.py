def apply_status_effects(character_state, active_effects):
    updated_state = character_state.copy()
    
    for effect in active_effects:
        if effect['duration'] > 0:
            boost_amount = updated_state['attack'] * effect['value']
            if effect['type'] == 'ATTACK_BOOST':
                updated_state['attack'] += boost_amount

        effect['duration'] -= 1
        
    remaining_effects = [eff for eff in active_effects 
                         if eff['duration'] >= 0]
    
    return updated_state, remaining_effects

def calculate_damage_output(character_state):
    base_damage = character_state['attack'] * 1.5
    
    damage_reduction_multiplier = 1.0 - (character_state['defense'] / 100.0)
    
    final_damage = base_damage * damage_reduction_multiplier
    return max(0, final_damage)