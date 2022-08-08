import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

interface UserPayloadBody  {
  username?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
  
export class AuthService {
  // private currentUserSubject!: BehaviorSubject<User>;
  // public currentUser!: Observable<User>;
  private userTokenSubject!: BehaviorSubject<string>;
  public userToken!: Observable<string>;

  constructor(private httpClient: HttpClient) {
    this.userTokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('userToken') || ''));
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
  }

  // Logout
  logout() {
    localStorage.removeItem('userToken');
    this.userTokenSubject.next('');
  }
}
