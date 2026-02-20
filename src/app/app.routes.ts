import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    {
        path: 'inside',
        component: MainLayout,
        children: [
        { path: 'home', component: Home },
        { path: 'products', loadChildren: () => import('./pages/productos/productos-module').then(m => m.ProductosModule) }
        ]
    }


];
