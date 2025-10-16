def reconcile_transactions(bank_statement, int_ledger):
    matched_records = []
    discrepancies = []
    internal_ref_ids = {tx['ref_id'] for tx in int_ledger}

    for bank_tx in bank_statement:
        if bank_tx['id'] in internal_ref_ids:
            matched_records.append(bank_tx)
        else:
            discrepancies.append(bank_tx)
            
    return matched_records, discrepancies

def cleared_balance(transactions, start_balance=10000):
    cleared_total = sum(tx['amount'] for tx in transactions 
                        if tx['status'] == 'CLEARED')
    final_balance = start_balance + cleared_total
    return final_balance

def flag_suspicious_activity(transactions):
    suspic_txns = [tx for tx in transactions 
                       if tx['amount'] > 10000 and tx['is_intl']]
    print(f"총 {len(suspic_txns)}건의 의심 거래가 발견되었습니다.")
    return suspic_txns
