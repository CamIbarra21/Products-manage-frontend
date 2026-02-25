import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { ToastService } from '../../../services/toast-service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-products-list',
  imports: [ButtonModule, RippleModule, ToastModule, TableModule, RouterLink, CurrencyPipe, PaginatorModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList implements OnInit {
  products: any[] = [];
  totalProducts: number = 0;
  first: number = 0;
  rows: number = 5;
  page: number = 1;
  constructor (private pService: ProductService, private toastMessage: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts(this.page, this.rows);
  }

  viewProduct(producto: any) {

  }

  updateProduct(producto: any) {
    this.router.navigate(['/inside/products/update', producto.id]);
  }

  deleteProduct (producto: any) {
    console.log(producto)
    this.pService.deleteProduct(producto.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastMessage.showSuccess(res.message || "Producto eliminado");
            this.loadProducts(this.page, this.rows); 
          } else {
            this.toastMessage.showError(res.message || "No se pudo eliminar el producto");
          }
        },
        error: (err) => {
          this.toastMessage.showError("Error al eliminar: " + err.error.message);
        }
      });
  }

  loadProducts(pageNumber: number, pageSize: number) {
    this.pService.paginateProducts(pageNumber, pageSize).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.data.items;
          this.totalProducts = res.data.totalCount;
        } else {
          this.toastMessage.showError(res.message);
        }
      },
      error: (err) => {
        this.toastMessage.showError('Error loading products: ' + err.error.message);
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;
    this.page = event.first && event.rows ? (event.first + event.rows) / event.rows : 1;
    console.log('First: ', this.first, '\nRows: ', this.rows, '\nPage: ', this.page);
    this.loadProducts(this.page, this.rows);
  }

}
