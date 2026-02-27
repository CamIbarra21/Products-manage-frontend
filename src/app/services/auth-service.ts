import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApi } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private baseUrl:string = "/api/Users";

   constructor (private http: HttpClient, private router: Router) {}

   login(userObj: any) {
    //https://localhost:7039/api/Users/login?username=x&password=d
    return this.http.post<any>(`${this.baseUrl}/login`, userObj);
   }

   register(userObj: any) {
    //https://localhost:7039/api/Users/register
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
   }

   storeToken(token: string) {
    localStorage.setItem('token', token);
   }

   getToken() {
    return localStorage.getItem('token');
   }

   storeRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
   }

   getRefreshToken() {
    return localStorage.getItem('refreshToken');
   }

   isLoggin(): boolean {
    return !!localStorage.getItem('token');
   }

   signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
   }

   decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
   }

   renewToken(tokenApi: TokenApi) {
    return this.http.post<any>(`${this.baseUrl}/refresh`, tokenApi);
   }
}
