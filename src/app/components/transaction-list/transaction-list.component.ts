import { Transaction } from './../../models/Transaction';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  public transactions: Transaction[] = [];
  public isLoading: boolean = false;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.transactionService.getTransactions().subscribe((data: any) => {
      this.transactions = data;
      this.isLoading = false;
    });
  }
}
