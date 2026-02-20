import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Producto } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://api.restful-api.dev/objects';

  constructor (private http: HttpClient) {}
  
  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: any): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, product);
  }

  updateProduct(id: number, product: any): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
