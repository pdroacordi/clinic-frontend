import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { Token } from '../model/Token';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public submitLogin(user: User): Observable<Token> {
    return this.http.post<Token>(`${environment.API_URL}/login`, user);
  }

  public isLoggedIn(): boolean{
    return !!localStorage.getItem('cl_tk');
  }

  public login(token: string): void {
    localStorage.setItem('cl_tk', token);
  }

  public logout():void {
    localStorage.removeItem('cl_tk');
  }
}
