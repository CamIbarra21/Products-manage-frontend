import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../services/toast-service';
import { MessageModule } from 'primeng/message';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { StoreService } from '../../../services/store-service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-store-form',
  imports: [ MessageModule, ToastModule, ButtonModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, CheckboxModule ],
  templateUrl: './store-form.html',
  styleUrl: './store-form.css',
})
export class StoreForm implements OnInit {
  storeForm!: FormGroup;
  formSubmitted: boolean = false;

  daysForm!: FormGroup;
  daysSelected: string[] = [];

  store: any;
  isUpdate: boolean = false;

  constructor(private fb: FormBuilder, private toastMessage: ToastService, private storeService: StoreService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.storeForm = this.fb.group({
      "name": ['', Validators.required],
      "location": ['', Validators.required],
      "manager": ['', Validators.required],
      "openTime": ['', Validators.required],
      "closeTime": ['', Validators.required]
    })

    this.daysForm = this.fb.group({
      monday: [false],
      tuesday: [false],
      wednesday: [false],
      thursday: [false],
      friday: [false],
      saturday: [false],
      sunday: [false]
    },
    { validators: this.atLeastOneSelectedValidator })

    if (id) {
      this.isUpdate = true;
      
      this.storeService.getById(Number(id)).subscribe({
        next: (res) => {
          if (res.success) {
            this.store = res.data;
            const [openTime, closeTime] = this.store.openingHours.split('-');
            this.storeForm.patchValue({
              name: this.store.name,
              location: this.store.location,
              manager: this.store.manager,
              openTime: openTime,
              closeTime: closeTime
            })

            const daysFormValue: { [key: string]: boolean } = {
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              friday: false,
              saturday: false,
              sunday: false
            };

            this.store.openingDays.forEach((day: string) => {
              daysFormValue[day.toLowerCase()] = true;
            });

            this.daysForm.patchValue(daysFormValue);


          } else {
            this.toastMessage.showError(res.message);
          }
        },
        error: (err) => {
          this.toastMessage.showError('Error loading store: ' + err.error.message);
        }
      })
    }
  }

  get daysKeys(): string[] {
      return Object.keys(this.daysForm.controls);
  }

  atLeastOneSelectedValidator(daysGroup: FormGroup): { [key: string]: any } | null {
      const anySelected = Object.values(daysGroup.controls).some((day) => day.value === true);
      return anySelected ? null : { atLeastOneRequired: true };
  }

  hasAnyInvalid(): boolean {
    return this.formSubmitted && this.daysForm.hasError('atLeastOneRequired');
  }

  isInvalid(controlName: string): boolean {
    const control = this.daysForm.get(controlName);
    return this.formSubmitted && this.daysForm.hasError('atLeastOneRequired') && control?.value === false;
  }

  onDaysFormSubmit() {
        this.formSubmitted = true;

        if (this.daysForm.valid) {
          //this.toastMessage.showSuccess("Days form is submitted")

          this.daysSelected = Object.keys(this.daysForm.value).filter(day => this.daysForm.value[day]);
          console.log(this.daysSelected);

          this.daysForm.reset({
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              friday: false,
              saturday: false,
              sunday: false
          });

          this.formSubmitted = false;
        }
    }

    save() {
      if (this.storeForm.valid) {
        this.onDaysFormSubmit();
          var newStore: any = {
            name: this.storeForm.value.name,
            location: this.storeForm.value.location,
            manager: this.storeForm.value.manager,
            openingDays: this.daysSelected ?? '',
            openingHours: `${this.storeForm.value.openTime}-${this.storeForm.value.closeTime}`
          }
        if (this.isUpdate) {
          this.storeService.updateStore(this.store.id, newStore).subscribe({
            next: () => {
              this.toastMessage.showSuccess("Tienda actualizado");
              this.router.navigate(['/inside/stores']);
            },
            error: () => this.toastMessage.showError("No se pudo actualizar la tienda")
          })
        } else {       
          this.storeService.addStore(newStore).subscribe({
            next: (res) => {
              console.log(res);
              if (res.success) {
                //console.log("New store added: ", newStore);
                
                this.toastMessage.showSuccess(res.message);
                setTimeout(() => {
                  this.router.navigate(['inside/stores']);
                }, 2000);
              } else {
                this.toastMessage.showError(res.message);
              }
            },
            error: (err) => {
              console.log(err);
              this.toastMessage.showError('Add store fail: ' + err.error.message);
            }
          });
        }
      } else {
        this.toastMessage.showWarn('Fill the required fields')
      }
    }
}
