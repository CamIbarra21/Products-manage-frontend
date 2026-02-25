import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private baseUrl:string = "/api/Users";

   constructor (private http: HttpClient) {}

   login(userObj: any) {
    //https://localhost:7039/api/Users/login?username=x&password=d
    return this.http.post<any>(`${this.baseUrl}/login`, userObj);
   }

   register(userObj: any) {
    //https://localhost:7039/api/Users/register
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
   }
}
