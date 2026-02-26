import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-main-layout',
  imports: [ Menu, RouterOutlet ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  items: MenuItem[] | undefined;

  constructor (private authService: AuthService) {}

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


}
