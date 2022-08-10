import { Transaction } from './../../models/Transaction';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {
  @Input() transaction!: Transaction;
  constructor() { }

  ngOnInit(): void {
  }
}
