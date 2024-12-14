import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoStatus } from '../../models/video-status.enum';

@Component({
  selector: 'app-report-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-button.component.html'
})
export class ReportButtonComponent {
  @Input() isReported = false;
  @Output() report = new EventEmitter<void>();

  onReport(): void {
    if (!this.isReported) {
      this.report.emit();
    }
  }
}