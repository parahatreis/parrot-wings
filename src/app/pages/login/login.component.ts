import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to home if already logged in
    if (this.authService.getUserToken) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    if (this.form.getRawValue().email === '' || this.form.getRawValue().password === '') {
      this.errorMessage = 'Please input your email and password';
      return
    }

    this.isLoading = true;
    this.authService.login(this.form.getRawValue())
      .pipe(first())
      .subscribe(
        () => {
          this.errorMessage = ''
          this.router.navigate(['/'])
        },
        (err) => {
          if (err) this.errorMessage = err.error
          this.isLoading = false;
        }
      );
  }
}