import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { StoreService } from '../../../services/store-service';
import { ToastService } from '../../../services/toast-service';
import { MessageModule } from 'primeng/message';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-stores-list',
  imports: [ TableModule, CommonModule, InputTextModule, ButtonModule, FormsModule, ToastModule, RouterLink ],
  templateUrl: './stores-list.html',
  styleUrl: './stores-list.css',
})
export class StoresList implements OnInit {
  stores!: any;

  constructor(private fb: FormBuilder, private storeService: StoreService, private toastMessage: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.loadStores();
  }

  viewStore(store: any) {
    //this.router.navigate(['/inside/products/view', producto.id])
  }

  updateStore(store: any) {
    this.router.navigate(['/inside/stores/update', store.id]);
  }

  deleteStore (store: any) {
    console.log(store)
    this.storeService.deleteStore(store.id).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastMessage.showSuccess(res.message || "Store delete");
            this.loadStores(); 
          } else {
            this.toastMessage.showError(res.message || "No se pudo eliminar la tienda");
          }
        },
        error: (err) => {
          this.toastMessage.showError("Error al eliminar: " + err.error.message);
        }
      });
  }

  loadStores() {
    this.storeService.getStores().subscribe({
      next: (res) => {
        if (res.success) {
          this.stores = res.data;
        } else {
          this.toastMessage.showError(res.message);
        }
      },
      error: (err) => {
        this.toastMessage.showError('Error loading stores: ' + err.error.message);
      }
    })
  }

}
