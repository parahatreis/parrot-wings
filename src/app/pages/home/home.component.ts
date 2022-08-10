import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import { AddTransactionComponent } from 'src/app/components/add-transaction/add-transaction.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  users: any;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.userService.getUser().subscribe();
  }

  openDialog() {
    this.dialog.open(AddTransactionComponent);
  }
}
