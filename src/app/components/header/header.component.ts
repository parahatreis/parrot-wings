import { AuthService } from 'src/app/services/auth.service';
import { InitialUserState } from './../../models/User';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: InitialUserState = null;
  subscription!: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.subscription = this.userService.getUserInfoAsObservable().subscribe(val =>
      this.user = val
    )
  }

  ngOnInit(): void { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
