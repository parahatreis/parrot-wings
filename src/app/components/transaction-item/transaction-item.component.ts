import { Transaction } from './../../models/Transaction';
import { Component, Input, OnInit } from '@angular/core';
import { AddTransactionComponent } from 'src/app/components/add-transaction/add-transaction.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {
  @Input() transaction!: Transaction;
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  handleClickCopyTransaction(t: Transaction) {
    this.dialog.open(AddTransactionComponent, {
      data: t,
    });
  }
}
