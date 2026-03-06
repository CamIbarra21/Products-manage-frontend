import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-upper-bar',
  imports: [ Toolbar, ButtonModule, SplitButton, InputTextModule, IconField, InputIcon ],
  templateUrl: './upper-bar.html',
  styleUrl: './upper-bar.css',
})
export class UpperBar implements OnInit {
  items: MenuItem[] | undefined;
  user: any;

  @Output() onToggle = new EventEmitter<void>();

  ngOnInit() {
    const userString = localStorage.getItem("actualUser");
    this.user = JSON.parse(userString ?? '{ fullname: sin usuario }');

    this.items = [
        {
            label: 'Account',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Settings',
            icon: 'pi pi-times'
        }
    ];
  }

  menuClicked() {
    this.onToggle.emit();
  }
}
