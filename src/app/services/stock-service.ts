import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from './product-service';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private baseUrl = "/api/business/StockStores";

  constructor(private http: HttpClient) {}

  getStocks(): Observable<APIResponse<any[]>> {
    return this.http.get<APIResponse<any[]>>(`${this.baseUrl}`);
  }

  addStock(stock: any): Observable<APIResponse<any>> {
    return this.http.post<APIResponse<any>>(`${this.baseUrl}`, stock);
  }

  updateStock(id: number, stock: any): Observable<APIResponse<any>> {
    return this.http.put<APIResponse<any>>(`${this.baseUrl}/${id}`, stock);
  }

  deleteStock(id: number): Observable<APIResponse<any>> {
    return this.http.delete<APIResponse<any>>(`${this.baseUrl}/${id}`);
  }

  getByProductAndStore(productId: number, storeId: number): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${this.baseUrl}/product${productId}/store${storeId}`);
  }
}
