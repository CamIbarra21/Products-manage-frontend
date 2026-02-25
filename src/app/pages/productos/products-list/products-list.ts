import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { ToastService } from '../../../services/toast-service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  imports: [ButtonModule, RippleModule, ToastModule, TableModule, RouterLink, CurrencyPipe],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList implements OnInit {
  products: any[] = [];

  constructor (private pService: ProductService, private toastMessage: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.pService.getProducts().subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.data; // aquí está la lista
        } else {
          this.toastMessage.showError(res.message);
        }
      },
      error: (err) => {
        this.toastMessage.showError('Error loading products: ' + err.error.message);
      }
    });

  }

  viewProduct(producto: any) {

  }

  updateProduct(producto: any) {

  }

  deleteProduct (producto: any) {
    console.log(producto)
    this.pService.deleteProduct(producto.id).subscribe({
        next: () => {
          this.toastMessage.showSuccess("Producto eliminado");
          this.router.navigate(['/inside/products']);
        },
        error: () => this.toastMessage.showError("No se pudo eliminar el producto")
      });
  }
}
