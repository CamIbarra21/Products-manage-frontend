import { Component, OnInit } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast-service';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [  ToastModule, ButtonModule, PasswordModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm!: FormGroup;

  constructor (private authService: AuthService, private fb: FormBuilder, private toastMessage: ToastService, private router: Router) {}

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

      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            this.toastMessage.showSuccess(res.message);
            localStorage.setItem('actualUser', JSON.stringify(res.data.item));
            console.log('Token: ', res.data.token.accesToken)
            this.authService.storeToken(res.data.token.accesToken);
            setTimeout(() => {
              this.router.navigate(['inside/home']);
            }, 2000);
            //this.router.navigate(['inside/home']);
          } else {
            this.toastMessage.showError(res.message);
          }
        },
        error: (err) => {
          this.toastMessage.showError('Login failed: ' + err);
        }
      });
    } else {
      this.toastMessage.showWarn('Fill the required fields')
    }
    
  }
}
