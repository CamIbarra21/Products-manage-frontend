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

  getById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });

    return this.http.get<any>(`/api/${id}`, { headers });
  }

  addProduct(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });
    return this.http.post<any>('/api', product, { headers });
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`/api/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });
    return this.http.delete<void>(`/api/${id}`, { headers });
  }
}
