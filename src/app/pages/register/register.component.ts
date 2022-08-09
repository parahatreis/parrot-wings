import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    // redirect to home if already logged in
    if (this.authService.getUserToken) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: ''
    });
  }

  submit(): void {
    if (
      this.form.getRawValue().username === '' ||
      this.form.getRawValue().email === '' ||
      this.form.getRawValue().password === ''
    ) {
      this.errorMessage = 'Please input your email and password';
      return
    }

    this.isLoading = true;
    this.authService.register(this.form.getRawValue())
      .subscribe(
        (res) => {
          this.errorMessage = ''
          this.router.navigate(['/']);
        },
        (err) => {
          if (err) this.errorMessage = err.error;
          this.isLoading = false;
        }
      );
  }
}