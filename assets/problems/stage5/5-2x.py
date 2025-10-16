def apply_status_effects(char_state, active_effects):
    updated_state = char_state.copy()
    
    for effect in active_effects:
        if effect['duration'] > 0:
            b_amt = updated_state['base_attack'] * effect['value']
            if effect['type'] == 'ATTACK_BOOST':
                updated_state['attack'] += b_amt
        
        effect['duration'] -= 1
    
    remaining_effects = [eff for eff in active_effects 
                         if eff['duration'] < 0]
    
    return updated_state, remaining_effects

def calculate_damage_output(char_state):
    base_damage = char_state['attack'] * 1.5
    
    dama_redu_multiplier = 1.0 + (char_state['defense'] / 100.0)
    
    final_damage = base_damage * dama_redu_multiplier
    return max(0, final_damage)