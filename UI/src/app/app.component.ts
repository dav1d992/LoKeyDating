import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'UI';
  users: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('http://localhost:5025/api/users').subscribe({
      next: (response) => {
        this.users = response;
        console.log(this.users);
      },
      error: (err) => console.error(err),
      complete: () => {
        console.log('Request completed');
      },
    });
  }
}
