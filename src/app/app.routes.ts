import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './guards/auth-guard';
import { Register } from './pages/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    {
        path: 'inside',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
        { path: 'home', component: Home },
        { path: 'products', loadChildren: () => import('./pages/productos/productos-module').then(m => m.ProductosModule) },
        { path: 'categories', loadChildren: () => import('./pages/categories/categories-module').then(m => m.CategoriesModule) }
        ]
    }


];
