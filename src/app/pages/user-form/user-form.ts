import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../services/toast-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ ToastModule, ButtonModule, PasswordModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastMessage: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      "fullname": ['', Validators.required],
      "email": ['', Validators.required],
      "username": ['', Validators.required],
      "password": ['', Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      var newUser: any = {
        fullname: this.registerForm.value.fullname,
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        profileImage: "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg",
        roleName: "User"
      }
      console.log("Nuevo usuario: ", newUser);
      this.authService.register(newUser).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            this.toastMessage.showSuccess(res.message);
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 2000);
            //this.router.navigate(['inside/home']);
          } else {
            this.toastMessage.showError(res.message);
          }
        },
        error: (err) => {
          console.log(err);
        this.toastMessage.showError('Register failed: ' + err.error.message);
        }
      });
    } else {
      this.toastMessage.showWarn('Fill the required fields')
    }
  }
}
