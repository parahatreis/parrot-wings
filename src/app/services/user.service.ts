import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  // User info
  getUser() {
    return this.httpClient.get<{ user_info_token: User }>(`${environment.apiURL}/api/protected/user-info`)
      .pipe(map(payload => {
        const user = payload.user_info_token
        console.log('USER ====================================');
        console.log(user);
        console.log('====================================');
        return user;
      }));
  }
}