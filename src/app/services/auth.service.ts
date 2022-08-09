import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface UserPayloadBody  {
  username?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
  
export class AuthService {
  private userTokenSubject!: BehaviorSubject<string>;
  public userToken!: Observable<string>;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) {
    const token = localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken') || '') : '';
    this.userTokenSubject = new BehaviorSubject<string>(token);
    this.userToken = this.userTokenSubject.asObservable();
  }

  public get getUserToken(): string {
    return this.userTokenSubject.value;
  }

  login(user: UserPayloadBody) {
    return this.httpClient.post<any>(`${environment.apiURL}/sessions/create`, user)
      .pipe(map(token => {
        const { id_token } = token;

        localStorage.setItem('userToken', JSON.stringify(id_token));
        this.userTokenSubject.next(id_token);
      }));
  }
  
  //Function to create a user record
  register(user: UserPayloadBody) {
    return this.httpClient.post<any>(`${environment.apiURL}/users`, user)
      .pipe(map(token => {
        const { id_token } = token;

        localStorage.setItem('userToken', JSON.stringify(id_token));
        this.userTokenSubject.next(id_token);
      }));
  }

  // Logout
  logout() {
    localStorage.removeItem('userToken');
    this.userTokenSubject.next('');
    this.userService.removeUserInfo();
  }
}
