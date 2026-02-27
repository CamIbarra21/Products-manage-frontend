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

@Component({
  selector: 'app-stores-list',
  imports: [ TableModule, CommonModule, InputGroup, InputTextModule, ButtonModule, FormsModule, ToastModule ],
  templateUrl: './stores-list.html',
  styleUrl: './stores-list.css',
})
export class StoresList implements OnInit {
  stores!: any;

  constructor(private fb: FormBuilder, private storeService: StoreService, private toastMessage: ToastService) {}

  ngOnInit(): void {
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
