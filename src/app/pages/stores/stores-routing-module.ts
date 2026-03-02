import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresList } from './stores-list/stores-list';
import { StoreForm } from './store-form/store-form';

const routes: Routes = [
  { path: '', component: StoresList },
  { path: 'add', component: StoreForm },
  { path: 'update/:id', component: StoreForm },
    //{ path: 'view/:id', component: ProductDetail }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
