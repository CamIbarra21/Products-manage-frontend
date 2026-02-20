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

@Component({
  selector: 'app-product-form',
  imports: [ RouterLink, ToastModule, ButtonModule, PasswordModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, FormsModule, Slider],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  productForm!: FormGroup;
  product: any;
  isUpdate: boolean = false;
  //value:number = 5;
  @Input() initialData: any;

  constructor (private fb: FormBuilder, private router: Router, private pService: ProductService, private route: ActivatedRoute, private toastMessage: ToastService) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      data1: [''],
      data2: [''],
      data3: [''],
      data4: [''],
      data5: ['']
    });

    if (id) {
      this.isUpdate = true;
      this.pService.getById(id).subscribe({
        next: (data) => this.product = data,
        error: () => this.toastMessage.showError("No se pudo cargar el producto")
      });
    }
  }

  dataFields: any[] = []

  /*
  addDataField(key: string = '', value: any = '') {
    this.dataFields.push(
      { key, value }
    );
  }

  setFieldCount(count: number) {
    while (this.dataFields.length < count) {
      this.addDataField();
    }
    while (this.dataFields.length > count) {
      this.dataFields.pop();
    }
  }*/

  save() {
    const producto = {
      name: this.productForm.value.name,
      data: {
        "Data 1": this.productForm.value.data1,
        "Data 2": this.productForm.value.data2,
        "Data 3": this.productForm.value.data3,
        "Data 4": this.productForm.value.data4,
        "Data 5": this.productForm.value.data5
      }
    };

    if (this.isUpdate) {
      this.pService.updateProduct(this.product.id, producto).subscribe({
        next: () => {
          this.toastMessage.showSuccess("Producto actualizado");
          this.router.navigate(['/inside/productos']);
        },
        error: () => this.toastMessage.showError("No se pudo actualizar el producto")
      });
    } else {
      //console.log(producto);
      //console.log(this.dataFields);
      this.pService.addProduct(producto).subscribe({
        next: () => {
          this.toastMessage.showSuccess("Producto creado");
          this.router.navigate(['/inside/products']);
        },
        error: () => this.toastMessage.showError("No se pudo crear el producto")
      });
    }

  }

}
