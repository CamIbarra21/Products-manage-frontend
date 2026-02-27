import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private baseUrl = "/api/business/Products";
  //private baseUrl:string = "https://localhost:7039/api/Users";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<APIResponse<any[]>> {
    //https://localhost:7039/api/ProductsControllerEF
    return this.http.get<APIResponse<any[]>>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<APIResponse<any>> {
    //https://localhost:7039/api/ProductsControllerEF/1
    return this.http.get<APIResponse<any>>(`${this.baseUrl}/${id}`);
  }

  addProduct(product: any): Observable<APIResponse<any>> {
    //https://localhost:7039/api/ProductsControllerEF
    return this.http.post<APIResponse<any>>(`${this.baseUrl}`, product);
  }

  updateProduct(id: number, product: any): Observable<APIResponse<any>> {
    //https://localhost:7039/api/ProductsControllerEF/1
    return this.http.put<APIResponse<any>>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<APIResponse<any>> {
    //https://localhost:7039/api/ProductsControllerEF/1
    return this.http.delete<APIResponse<any>>(`${this.baseUrl}/${id}`);
  }

  paginateProducts(pageNumber: number, pageSize: number): Observable<APIResponse<any>> {
    //https://localhost:7039/api/ProductsControllerEF/paged?pageNumber=2&pageSize=5
    return this.http.get<APIResponse<any>>(`${this.baseUrl}/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  getProductsCount(): Observable<APIResponse<any>> {
    //https://localhost:7039/api/ProductsControllerEF/count
    return this.http.get<APIResponse<any>>(`${this.baseUrl}/count`);
  }

}
