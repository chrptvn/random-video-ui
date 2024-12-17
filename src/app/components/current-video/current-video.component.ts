import { Component } from '@angular/core';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoLink } from '../../models/video-link.model';
import { Observable } from "rxjs";
import { VideoStatus } from '../../models/video-status.enum';
import {VideoPlayerComponent} from "../video-player/video-player.component";

@Component({
  selector: 'app-current-video',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgIf, VideoPlayerComponent],
  templateUrl: './current-video.component.html',
})
export class CurrentVideoComponent {
  videoLink$: Observable<VideoLink | undefined> = this.videoLinkService.getCurrentVideoLink();

  constructor(private videoLinkService: VideoLinkService) {}

  public reportAbuse(videoLink: VideoLink): void {
    this.videoLinkService.reportLink(videoLink).subscribe({
      next: () => {
        videoLink.status = VideoStatus.REPORTED;
      },
      error: (err) => {
        console.error('Failed to report video:', err);
      }
    });
  }

  protected readonly VideoStatus = VideoStatus;
}