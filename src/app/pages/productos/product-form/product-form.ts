import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { ToastService } from '../../../services/toast-service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Slider } from 'primeng/slider';
import { InputNumber } from 'primeng/inputnumber';
import { CategoryService } from '../../../services/category-service';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-product-form',
  imports: [ Select, InputNumber, RouterLink, ToastModule, ButtonModule, PasswordModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  standalone: true,
})
export class ProductForm implements OnInit {
  productForm!: FormGroup;
  product: any;
  isUpdate: boolean = false;
  categories: any[] | undefined;
  //value:number = 5;

  constructor (private catService: CategoryService, private fb: FormBuilder, private router: Router, private pService: ProductService, private route: ActivatedRoute, private toastMessage: ToastService) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      category: ['', Validators.required],
      imageLink: ['']
    });

    this.catService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.categories = res.data.map((c: any) => (c.name));

          console.log(this.categories[0])
        } else {
          this.toastMessage.showError(res.message);
        }
      },
      error: (err) => {
        this.toastMessage.showError('Error loading categories: ' + err.error.message);
      }
    })

    console.log(this.categories);

    if (id) {
      this.isUpdate = true;
      this.pService.getById(Number(id)).subscribe({
        next: (res) => {
          if (res.success) {
            this.product = res.data;
            this.productForm.patchValue({
              name: this.product.name,
              description: this.product.description,
              price: this.product.price,
              category: this.product.category,
              imageLink: this.product.imageLink
            });

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

  save() {
    const formProduct = this.productForm.value;

    if (this.isUpdate) {
      this.pService.updateProduct(this.product.id, formProduct).subscribe({
        next: () => {
          this.toastMessage.showSuccess("Producto actualizado");
          this.router.navigate(['/inside/products']);
        },
        error: () => this.toastMessage.showError("No se pudo actualizar el producto")
      });
    } else {
      //console.log(formProduct);
      
      this.pService.addProduct(formProduct).subscribe({
        next: () => {
          this.toastMessage.showSuccess("Producto creado");
          this.router.navigate(['/inside/products']);
        },
        error: () => this.toastMessage.showError("No se pudo crear el producto")
      });
    }

  }

}
