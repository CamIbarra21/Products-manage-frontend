import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category-service';
import { ToastService } from '../../../services/toast-service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputGroup } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-categories-list',
  imports: [ TableModule, CommonModule, InputGroup, InputTextModule, ButtonModule, FormsModule, ToastModule ],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.css',
})
export class CategoriesList implements OnInit {
  categories: any[] = [];
  newCategory: string = '';

  constructor (private catService: CategoryService, private toastMessage: ToastService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.catService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
        } else {
          this.toastMessage.showError(res.message);
        }
      },
      error: (err) => {
        this.toastMessage.showError('Error loading categories: ' + err.error.message);
      }
    });
  }

  addCategory() {
    if (!this.newCategory.trim()) return;

    this.catService.addCategory(this.newCategory).subscribe({
      next: () => {
        this.toastMessage.showSuccess(`${this.newCategory} category added`)
        this.newCategory = '';
        this.loadCategories(); // refresca la lista
      },
      error: (err) => {
        console.log(err);
        console.error(err.error.message)
        this.toastMessage.showError(err.error.message);
      }
    });
  }

}
