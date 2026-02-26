import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = "/api/Categories";
  //private baseUrl:string = "https://localhost:7039/api/Users";

  constructor(private http: HttpClient) {}

  getCategories(): Observable<APIResponse<any[]>> {
    return this.http.get<APIResponse<any[]>>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${this.baseUrl}/${id}`);
  }

  addCategory(name: string): Observable<APIResponse<any>> {
    return this.http.post<APIResponse<any>>(`${this.baseUrl}`, { name });
  }

  updateCategory(id: number, product: any): Observable<APIResponse<any>> {
    return this.http.put<APIResponse<any>>(`${this.baseUrl}/${id}`, product);
  }

  deleteCategory(id: number): Observable<APIResponse<any>> {
    return this.http.delete<APIResponse<any>>(`${this.baseUrl}/${id}`);
  }
}
