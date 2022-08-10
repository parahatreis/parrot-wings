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
  // private transactionsSubject!: BehaviorSubject<any>;
  // public transactions!: Observable<any>;

  constructor(private httpClient: HttpClient) { }
  
  getTransactions() {
    return this.httpClient.get<{ trans_token: Transaction }>(`${environment.apiURL}/api/protected/transactions`)
      .pipe(map(payload => {
        const transactionsArr = payload.trans_token
        return transactionsArr as Transaction;
      }));
  }

  createTransaction(trans: TransactionPayloadBody) {
    return this.httpClient.post<any>(`${environment.apiURL}/api/protected/transactions`, trans)
      .pipe(map(payload => {
        const { trans_token } = payload;
        return trans_token as Transaction;
      }));
  }
}
