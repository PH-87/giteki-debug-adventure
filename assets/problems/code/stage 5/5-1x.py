
# 금융 거래 기록 대사(Reconciliation) 시스템

def reconcile_transactions(bank_statement, internal_ledger):
    matched_records = []
    discrepancies = []
    # 내부 장부에서 참조 ID 목록을 미리 생성하여 조회 성능을 최적화
    internal_ref_ids = {tx['ref_id'] for tx in internal_ledger}

    # 은행 명세서의 모든 거래를 순회
    for bank_tx in bank_statement:
        if bank_tx['id'] not in internal_ref_ids:       # ❌ 오류 1: 일치하는 거래를 불일치 목록에, 불일치 거래를 일치 목록에 추가함
            matched_records.append(bank_tx)
        else:
            discrepancies.append(bank_tx)
            
    return matched_records, discrepancies

def calculate_cleared_balance(transactions, start_balance=1000000):
    cleared_total = sum(tx['amount'] for tx in transactions if tx['status'] != 'PENDING')    # ❌ 오류 2: 'CLEARED' 상태가 아닌 모든 거래('REJECTED' 포함)를 합산함
    final_balance = start_balance + cleared_total
    return final_balance

def flag_suspicious_activity(transactions):
    suspicious_txns = [tx for tx in transactions if tx['amount'] > 1000000 or tx['is_intl']] # ❌ 오류 3: 'AND'가 아닌 'OR'를 사용하여, 모든 해외 거래 또는 모든 100만원 초과 거래를 의심 거래로 잘못 판단함
    
    print(f"총 {len(suspicious_txns)}건의 의심 거래가 발견되었습니다.")
    return suspicious_txns