import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from './product-service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private baseUrl = "/api/business/Stores";

  constructor(private http: HttpClient) {}

  getStores(): Observable<APIResponse<any[]>> {
    return this.http.get<APIResponse<any[]>>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${this.baseUrl}/${id}`);
  }

  addStore(store: any): Observable<APIResponse<any>> {
    return this.http.post<APIResponse<any>>(`${this.baseUrl}`, store);
  }

  updateStore(id: number, store: any): Observable<APIResponse<any>> {
    return this.http.put<APIResponse<any>>(`${this.baseUrl}/${id}`, store);
  }

  deleteStore(id: number): Observable<APIResponse<any>> {
    return this.http.delete<APIResponse<any>>(`${this.baseUrl}/${id}`);
  }
}
