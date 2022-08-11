import { Transaction } from './../../models/Transaction';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  public transactions: Transaction[] = [];
  public isLoading: boolean = false;
  subscription!: Subscription;

  constructor(private transactionService: TransactionService) {
    this.subscription = this.transactionService.getTransactionsAsObservable().subscribe(val => {
      if (val && val.length > 0) {
        // Sort by date
        val.sort(function(tr1: Transaction, tr2: Transaction){
          const a: number = new Date(tr1.date).getTime();
          const b: number = new Date(tr2.date).getTime();
          return b - a;
        });
      }
      this.transactions = val;
    })
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.transactionService.getTransactions().subscribe(() => {
      this.isLoading = false;
    });
  }
}
