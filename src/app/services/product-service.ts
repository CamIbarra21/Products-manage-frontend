import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = "/api/ProductsControllerEF";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    //https://localhost:7039/api/ProductsControllerEF
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<any> {
    //https://localhost:7039/api/ProductsControllerEF/1
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    //https://localhost:7039/api/ProductsControllerEF
    return this.http.post<any>(`${this.baseUrl}`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    //https://localhost:7039/api/ProductsControllerEF/1
    return this.http.put<any>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    //https://localhost:7039/api/ProductsControllerEF/1
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
