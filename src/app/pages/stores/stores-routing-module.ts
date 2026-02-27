import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresList } from './stores-list/stores-list';

const routes: Routes = [
  { path: '', component: StoresList },
    //{ path: 'add', component: CategoryForm },
    //{ path: 'update/:id', component: ProductForm },
    //{ path: 'view/:id', component: ProductDetail }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
