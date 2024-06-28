import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/User';
import { Observable } from 'rxjs';
import { Token } from '../../model/Token';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import jwt_decode, { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient) { }

  public submitLogin(user: User): Observable<Token> {
    return this.http.post<Token>(`${environment.API_URL}/login`, user);
  }

  public isLoggedIn(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    const token = this.getToken();
    return !!token && !this.isTokenValid(token);
  }

  public isTokenValid(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  }

  public login(token: string): void {
    localStorage.setItem('cl_tk', token);
  }

  public logout(): void {
    localStorage.removeItem('cl_tk');
  }

  public getToken(): string {
    if (typeof localStorage === 'undefined') {
      this.router.navigate(['/']);
      return "";
    }
    return localStorage.getItem('cl_tk') ?? "";
  }
}
