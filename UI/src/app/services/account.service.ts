import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'http://localhost:5025/api/';
  constructor(private http: HttpClient) {}

  public login(model: any) {
    return this.http.post(this.baseUrl + 'accounts/login', model);
  }
}
