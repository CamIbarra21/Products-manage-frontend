import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../services/auth-service';
import { ToastModule } from 'primeng/toast';
import { UpperBar } from '../upper-bar/upper-bar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-main-layout',
  imports: [ Menu, RouterOutlet, ToastModule, UpperBar, ButtonModule, DrawerModule ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  items: MenuItem[] | undefined;
  sidebarVisible: boolean = true;
  openSidebarDrawer: boolean = false;
  constructor (private authService: AuthService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Menu',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
            routerLink: '/inside/home'
          },
          {
            label: 'Products',
            icon: 'pi pi-box',
            routerLink: '/inside/products'
          }
        ]
      },
      {
        label: 'Others',
        items: [
          {
            label: 'Categories',
            icon: 'pi pi-bullseye',
            routerLink: '/inside/categories'
          },
          {
            label: 'Stores',
            icon: 'pi pi-shop',
            routerLink: '/inside/stores'
          },
          {
            label: 'Stock',
            icon: 'pi pi-shopping-cart',
            routerLink: '/inside/stocks'
          },
          {
            label: 'Signout',
            icon: 'pi pi-sign-out',
            linkClass: '!text-red-500 dark:!text-red-400',
            command: () => {
              this.authService.signOut();
            }
          }
        ]
      }
    ]
  }

  toggleSidebar() {
    this.openSidebarDrawer = !this.openSidebarDrawer;
    console.log("Cambio drawer")
  }

  sidebarVisibility() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
