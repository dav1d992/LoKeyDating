import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public baseUrl = 'http://localhost:5025/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  public login(model: any) {
    return this.http.post<User>(this.baseUrl + 'accounts/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  public signOut() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  public setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  public register(model: any) {
    return this.http.post<User>(this.baseUrl + 'accounts/register', model).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }
}
