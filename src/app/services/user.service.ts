import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InitialUserState, User } from '../models/User';
import { environment } from 'src/environments/environment';
import { map, BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject!: BehaviorSubject<InitialUserState>;
  public currentUser!: Observable<InitialUserState>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<InitialUserState>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // User info
  getUser() {
    return this.httpClient.get<{ user_info_token: User }>(`${environment.apiURL}/api/protected/user-info`)
      .pipe(map(payload => {
        const user = payload.user_info_token
        this.currentUserSubject.next(user);
      }));
  }

  getUserInfoAsObservable(): Observable<InitialUserState> {
    return this.currentUserSubject.asObservable();
  }

  public get getUserInfo(): InitialUserState {
    return this.currentUserSubject.value;
  }

  updateUserBalance(newBalance: number): void {
    const newUserData = {
      ...this.currentUserSubject.value,
      balance: newBalance,
    }
    this.currentUserSubject.next(newUserData as any)
  }

  removeUserInfo(): void {
    this.currentUserSubject.next(null);
  }
}