import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoLink } from '../../models/video-link.model';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoStatusButtonComponent } from '../video-status-button/video-status-button.component';
import { VideoStatus } from '../../models/video-status.enum';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule, RouterModule, VideoStatusButtonComponent],
  templateUrl: './video-list.component.html'
})
export class VideoListComponent {
  @Input() videos: VideoLink[] = [];

  constructor(private videoLinkService: VideoLinkService) {}

  onStatusChange(video: VideoLink): void {
    if (video.status === VideoStatus.DISABLED) {
      video.status = VideoStatus.ENABLED;
      this.videoLinkService.setLastWatchedVideo(video);
    }
  }
}