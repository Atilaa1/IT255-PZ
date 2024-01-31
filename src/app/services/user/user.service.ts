import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:3000/users"
  constructor(private _httpClient: HttpClient, private routes: Router) { }

  private _createUserFromObject(item: any) {
    return new User(item.id, item.username, item.password, item.mail, item.admin);
  }

  public getNextId(): Observable<number> {
    return new Observable(observer => {
      let max = 0;
      this.getAllUsers().subscribe(users => {
        users.forEach(current => {
          if (current.id > max) {
            max = current.id;
          }
        });
        observer.next(max + 1);
        observer.complete();
      });
    });
  }


  public getUser(id: Number): Observable<User> {
    return this._httpClient.get<User>(this.baseUrl + "/" + id).pipe(
      map((data: User) => this._createUserFromObject(data))
    );
  }

  public getAllUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.baseUrl).pipe(
      map((items: any) => items.map((item: any) => this._createUserFromObject(item)))
    )

  }

  public addUser(username: string, password: string, mail: string) {
    this.getNextId().subscribe(nextId => {
      let user = new User(nextId, username, password, mail, false);
      this._httpClient.post(this.baseUrl, user).subscribe(
        (data: any) => {
          this._createUserFromObject(data)
        });
      this.routes.navigate(['/'])
    });
  }


  public getUserss(username: string, password: string): Observable<User> {
    return this._httpClient.get<User[]>(`${this.baseUrl}?username=${username}&password=${password}`)
      .pipe(
        map((users: User[]) => {
          return users.find(user => user.username === username && user.password === password);
        }),
        map(item => this._createUserFromObject(item))
      );

  }

}
