import { TransactionService } from './../../services/transaction.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, finalize, first, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Transaction } from 'src/app/models/Transaction';
import { MatDialog } from '@angular/material/dialog';

export interface User {
  id: number;
  name: string;
}
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  form!: FormGroup;
  userControl = new FormControl<string | User>('');
  errorMessage: string = '';
  isLoading: boolean = false;

  searchErrorMessage: string = '';
  searchLoading: boolean = false;
  filteredUsers!: any;
  selectedUser: any = ' ';

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private transactionService: TransactionService,
    private userService: UserService,
     public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: ''
    });

    this.userControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        tap(() => {
          this.searchErrorMessage = '';
          this.filteredUsers = [];
          this.searchLoading = true;
        }),
        switchMap(value => this.httpClient.post<any>(`${environment.apiURL}/api/protected/users/list`, { filter: value === '' ? ' ' : value })
          .pipe(
            finalize(() => {
              this.searchLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        this.filteredUsers = data;
      });
  }

  onSelected() {
    this.selectedUser = this.selectedUser;
  }

  displayFn(name: string): string {
    return name;
  }

  submit(): void {
    const amount = this.form.getRawValue().amount;
    const currentUserBalance = this.userService.getUserInfo?.balance
    if (amount === '' || this.selectedUser === '') {
      this.errorMessage = 'Please select user and input amount';
      return
    }
    if (amount > currentUserBalance) {
      this.errorMessage = 'Amount must be lower than your balance!';
      return
    }

    const req = { name: this.selectedUser, amount: Number(this.form.getRawValue().amount) }
    this.isLoading = true;
    this.transactionService.createTransaction(req)
      .pipe(first())
      .subscribe(
        (res: Transaction) => {
          this.errorMessage = ''
          this.userService.updateUserBalance(res.balance);
          this.dialog.closeAll();
        },
        (err) => {
          if (err) this.errorMessage = err.error
          this.isLoading = false;
        }
      );
  }
}
