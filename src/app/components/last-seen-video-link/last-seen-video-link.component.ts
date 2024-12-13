import {Component, Input} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoLink } from '../../models/video-link.model';
import {Observable} from "rxjs";

@Component({
  selector: 'app-last-seen-video-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgIf],
  templateUrl: './last-seen-video-link.component.html',
})
export class LastSeenVideoLinkComponent {
  lastWatchedVideoLink$: Observable<VideoLink | undefined> = this.videoLinkService.getLastWatchedVideo();
  constructor(private videoLinkService: VideoLinkService) {}

  public reportAbuse(videoLink: VideoLink): void {
    this.videoLinkService.reportLink(videoLink).subscribe({
      next: () => {
        alert('The video has been reported as abusive.');
      },
      error: (err) => {
        console.error('Failed to report video:', err);
      }
    });
  }
}