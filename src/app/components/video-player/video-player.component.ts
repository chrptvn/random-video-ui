import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoLink } from '../../models/video-link.model';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoStatusButtonComponent } from '../video-status-button/video-status-button.component';
import { VideoStatus } from '../../models/video-status.enum';

@Component({
    selector: 'app-video-player',
    standalone: true,
    imports: [CommonModule, RouterModule, VideoStatusButtonComponent],
    templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent {
    @Input() videoLink?: VideoLink;
    @Input() showLink?: boolean;

    constructor(private videoLinkService: VideoLinkService) {}

    onStatusChange(video: VideoLink): void {
        if (video.status === VideoStatus.FETCHED) {
            this.videoLinkService.saveVideoLink(video).subscribe(
                () => {
                    video.status = VideoStatus.READY;
                },
                (err) => {
                    console.error('Failed to save video:', err);
                }
            );
        } else if (video.status === VideoStatus.ACTIVE) {
            this.videoLinkService.reportLink(video).subscribe({
                next: () => {
                    video.status = VideoStatus.REPORTED;
                },
                error: (err) => {
                    console.error('Failed to report video:', err);
                }
            });
        }
    }

    protected readonly VideoStatus = VideoStatus;
}