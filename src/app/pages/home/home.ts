import { Component, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-home',
  imports: [ToastModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  user: any;

  ngOnInit(): void {
    const userString = localStorage.getItem("actualUser");
    this.user = JSON.parse(userString ?? '{ fullname: sin usuario }');
  }
}
