import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { StoreService } from '../../services/store-service';
import { ProductService } from '../../services/product-service';
import { ToastService } from '../../services/toast-service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PickListModule } from 'primeng/picklist';
import { InputNumber } from 'primeng/inputnumber';
import { StockService } from '../../services/stock-service';

@Component({
  selector: 'app-stocks',
  imports: [ PickListModule, CommonModule, TabsModule, ToastModule, ButtonModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, FormsModule, InputNumber],
  templateUrl: './stocks.html',
  styleUrl: './stocks.css',
})
export class Stocks implements OnInit {

  sourceStores!: any[];

  targetStores!: any[];

  sourceProducts!: any[];

  targetProducts!: any[];

  addForm!: FormGroup;

  constructor(private fb: FormBuilder, private storeService: StoreService, private productService: ProductService, private toastMessage: ToastService, private stockService: StockService) {}

  ngOnInit() {
    this.loadStoresProducts();

    this.addForm = this.fb.group({
      quantity: [1, Validators.required]
    })
  }

  addStock() {
    if (this.addForm.valid) {
      const quantity = this.addForm.get('quantity')?.value;
      if (this.targetStores.length > 0 && this.targetProducts.length > 0) {
        this.targetStores.forEach(store => {
          this.targetProducts.forEach(product => {
              const stock = { 
                storeId: store.id, 
                storeName: "",
                productId: product.id, 
                productName: "",
                quantity };
              console.log(stock);              
              this.stockService.addStock(stock).subscribe({
                next: (res) => {
                  if (res.success) {
                    this.toastMessage.showSuccess('Stock added successfully');
                  } else {
                    this.toastMessage.showError(res.message);
                  }
                },
                error: (err) => {
                  console.log(err);
                  this.toastMessage.showError('Error adding stock: ' + err);
                }
              });
            });
        });
        this.addForm.reset({ quantity: 1 });
      } else {
        this.toastMessage.showWarn('Please select a store and product');
      }
    } else {
      this.toastMessage.showWarn('Please fill the required fields');
    }
  }

  loadStoresProducts() {
    this.storeService.getStores().subscribe({
        next: (res) => {
          if (res.success) {
            this.sourceStores = res.data;
          } else {
            this.toastMessage.showError(res.message);
          }
        },
        error: (err) => {
          this.toastMessage.showError('Error loading stores: ' + err.error.message);
        }
    });
    this.targetStores = [];

    this.productService.getProducts().subscribe({
      next: (res) => {
        if (res.success) {
          this.sourceProducts = res.data;
        } else {
          this.toastMessage.showError(res.message);
        }
      },
      error: (err) => {
        this.toastMessage.showError('Error loading products: ' + err.error.message);
      }
    })
    this.targetProducts = [];
  }
}
