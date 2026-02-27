import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private baseUrl:string = "/api/auth/Users";
   //private baseUrl:string = "https://localhost:5001/api/Users";

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

   isLoggin(): boolean {
    return !!localStorage.getItem('token');
   }

   signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
   }
}
