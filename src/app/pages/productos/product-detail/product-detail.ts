import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastService } from '../../../services/toast-service';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-product-detail',
  imports: [CardModule, ButtonModule, RouterLink, Image],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private pService: ProductService, private toastMessage: ToastService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pService.getById(Number(id)).subscribe({
        next: (res) => {
          if (res.success) {
            this.product = res.data;

          } else {
            this.toastMessage.showError(res.message);
          }
        },
        error: (err) => {
          this.toastMessage.showError('Error loading the product: ' + err.error.message);
        }
      });
  }
}
