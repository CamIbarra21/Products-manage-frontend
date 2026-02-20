import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-main-layout',
  imports: [ Menu, RouterOutlet ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'General',
        items: [
          {
            label: 'Home',
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
            label: 'Add product',
            icon: 'pi pi-plus'
          },
          {
            label: 'Account',
            icon: 'pi pi-user'
          }
        ]
      }
    ]
  }
}
