import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  users: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getUser().pipe(first()).subscribe(users => {
      console.log('====================================');
      console.log('users', users);
      console.log('====================================');
    });
  }
}
