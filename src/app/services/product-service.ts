import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiKey = '32f05446-ea03-484f-ad20-d4f342a4d5f6';

  constructor (private http: HttpClient) {}
  
  getProducts(): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });
    return this.http.get<any[]>(`/api`, { headers });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`/api/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>('/api', product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`/api/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/${id}`);
  }
}
