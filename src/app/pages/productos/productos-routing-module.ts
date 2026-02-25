import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsList } from './products-list/products-list';
import { ProductForm } from './product-form/product-form';
import { ProductDetail } from './product-detail/product-detail';

const routes: Routes = [
  { path: '', component: ProductsList },
  { path: 'add', component: ProductForm },
  { path: 'update/:id', component: ProductForm },
  { path: 'view/:id', component: ProductDetail }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule {
  
 }
