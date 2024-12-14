import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-button.component.html'
})
export class ReportButtonComponent {
  @Input({transform: booleanAttribute}) isReported = false;
  @Output() report = new EventEmitter<void>();

  onReport(): void {
    if (!this.isReported) {
      this.report.emit();
    }
  }
}