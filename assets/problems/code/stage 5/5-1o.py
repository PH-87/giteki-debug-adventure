
# 금융 거래 기록 대사(Reconciliation) 시스템

def reconcile_transactions(bank_statement, internal_ledger):
    matched_records = []
    discrepancies = []
    # 내부 장부에서 참조 ID 목록을 미리 생성하여 조회 성능을 최적화
    internal_ref_ids = {tx['ref_id'] for tx in internal_ledger}

    # 은행 명세서의 모든 거래를 순회
    for bank_tx in bank_statement:
        if bank_tx['id'] in internal_ref_ids:
            matched_records.append(bank_tx)
        else:
            discrepancies.append(bank_tx)
            
    return matched_records, discrepancies

def calculate_cleared_balance(transactions, start_balance=1000000):
    cleared_total = sum(tx['amount'] for tx in transactions if tx['status'] == 'CLEARED')
    final_balance = start_balance + cleared_total
    return final_balance

def flag_suspicious_activity(transactions):
    suspicious_txns = [tx for tx in transactions if tx['amount'] > 1000000 and tx['is_intl']]
    
    print(f"총 {len(suspicious_txns)}건의 의심 거래가 발견되었습니다.")
    return suspicious_txns
