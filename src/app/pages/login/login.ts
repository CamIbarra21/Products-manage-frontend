import { Component, OnInit } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  imports: [  ToastModule, ButtonModule, PasswordModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm!: FormGroup;

  constructor (private fb: FormBuilder, private toastMessage: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      "username": ['', Validators.required],
      "password": ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      if (username == 'innova' && password == 'innova123') {
        this.toastMessage.showSuccess(`Welcome ${username}`);
        this.router.navigate(['inside/home']);
      } else {
        this.toastMessage.showError('Username or password is incorrect');
      }
    } else {
      this.toastMessage.showWarn('Fill the required fields')
    }
    
  }
}
