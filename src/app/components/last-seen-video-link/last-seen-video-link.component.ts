import { Component } from '@angular/core';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoLink } from '../../models/video-link.model';
import { Observable, BehaviorSubject } from "rxjs";
import { ReportButtonComponent } from '../report-button/report-button.component';

@Component({
  selector: 'app-last-seen-video-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgIf, ReportButtonComponent],
  templateUrl: './last-seen-video-link.component.html',
})
export class LastSeenVideoLinkComponent {
  lastWatchedVideoLink$: Observable<VideoLink | undefined> = this.videoLinkService.getLastWatchedVideo();
  private isReported = new BehaviorSubject<boolean>(false);
  isReported$ = this.isReported.asObservable();
  
  constructor(private videoLinkService: VideoLinkService) {}

  public reportAbuse(videoLink: VideoLink): void {
    this.videoLinkService.reportLink(videoLink).subscribe({
      next: () => {
        this.isReported.next(true);
        alert('Thank you for helping keep our community safe. The video has been flagged for review.');
      },
      error: (err) => {
        console.error('Failed to report video:', err);
        alert('Unable to flag the video. Please try again later.');
      }
    });
  }
}