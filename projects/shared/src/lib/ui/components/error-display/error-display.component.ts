import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorState } from '../../../models/error-state.model';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent {
  @Input() error: ErrorState | null = null;
  @Input() title = 'Error';
  @Input() showRetry = true;

  onRetry(): void {
    if (this.error?.retryAction) {
      this.error.retryAction();
    }
  }
}
