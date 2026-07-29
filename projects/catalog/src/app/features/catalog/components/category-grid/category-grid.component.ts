import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.scss']
})
export class CategoryGridComponent {
  @Input({ required: true }) categories: Category[] = [];
}
