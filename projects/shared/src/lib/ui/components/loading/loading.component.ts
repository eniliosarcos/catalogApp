import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSize } from '@shared/models/ui.model';

@Component({
  selector: 'shared-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() size: LoadingSize = 'md';
  @Input() message?: string;
  @Input() containerClass = 'py-8';

  get sizeClass(): string {
    const sizes = {
      sm: 'w-6 h-6',
      md: 'w-10 h-10',
      lg: 'w-16 h-16'
    };
    return sizes[this.size];
  }
}
