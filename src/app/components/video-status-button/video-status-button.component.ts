import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoStatus } from '../../models/video-status.enum';

@Component({
  selector: 'app-video-status-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-status-button.component.html'
})
export class VideoStatusButtonComponent {
  @Input() status: VideoStatus = VideoStatus.DISABLED;
  @Output() statusChange = new EventEmitter<void>();

  VideoStatus = VideoStatus;

  getButtonClasses(): string {
    const baseClasses = 'px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200 whitespace-nowrap';
    
    switch (this.status) {
      case VideoStatus.ENABLED:
        return `${baseClasses} bg-green-600/20 text-green-300 border border-green-500/20`;
      case VideoStatus.REPORTED:
        return `${baseClasses} bg-red-600/20 text-red-300 border border-red-500/20`;
      default:
        return `${baseClasses} bg-purple-600 hover:bg-purple-700 text-white`;
    }
  }
}