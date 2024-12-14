import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoLink } from '../../models/video-link.model';
import { RandomLinkFilter } from "../../models/random-link-filter.model";

@Component({
  selector: 'app-random-video',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './random-video.component.html'
})
export class RandomVideoComponent {
  constructor(private videoLinkService: VideoLinkService) {}

  openRandomVideo(): void {
    this.videoLinkService.getRandomVideo({ excludedLinkIds: []} as RandomLinkFilter).subscribe({
      next: (randomVideo: VideoLink) => {
        if (randomVideo?.url) {
          this.videoLinkService.setLastWatchedVideo(randomVideo);
          window.open(randomVideo.url, '_blank');
        } else {
          alert('No videos available');
        }
      },
      error: (err) => {
        console.error('Failed to fetch random video:', err);
        alert('An error occurred while fetching a random video.');
      },
    });
  }
}