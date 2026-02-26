import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesList } from './categories-list/categories-list';

const routes: Routes = [
  { path: '', component: CategoriesList },
  //{ path: 'add', component: CategoryForm },
  //{ path: 'update/:id', component: ProductForm },
  //{ path: 'view/:id', component: ProductDetail }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
