import { Transaction } from './../models/Transaction';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface TransactionPayloadBody {
  name: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionsSubject: BehaviorSubject<Transaction[]>;
  public transactions: Observable<Transaction[]>;

  constructor(private httpClient: HttpClient) {
    this.transactionsSubject = new BehaviorSubject<Transaction[]>([]);
    this.transactions = this.transactionsSubject.asObservable();
  }
  
  getTransactions() {
    return this.httpClient.get<{ trans_token: Transaction }>(`${environment.apiURL}/api/protected/transactions`)
      .pipe(map(payload => {
        const transactionsArr: any = payload.trans_token
        this.transactionsSubject.next(transactionsArr);
      }));
  }

  createTransaction(trans: TransactionPayloadBody) {
    return this.httpClient.post<any>(`${environment.apiURL}/api/protected/transactions`, trans)
      .pipe(map(payload => {
        const { trans_token } = payload;
        return trans_token as Transaction;
      }));
  }

  getTransactionsAsObservable(): Observable<any> {
    return this.transactionsSubject.asObservable();
  }

  addTransaction(newTransaction: Transaction): void {
    const updatedTransactionArray = [
      ...this.transactionsSubject.value,
      newTransaction
    ]
    this.transactionsSubject.next(updatedTransactionArray);
  }

  clearTransactions() {
    this.transactionsSubject.next([]);
  }
}
