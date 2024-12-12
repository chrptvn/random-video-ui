import { Component } from '@angular/core';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoLink } from '../../models/video-link.model';

@Component({
  selector: 'app-random-video',
  standalone: true,
  template: `
    <button
      (click)="openRandomVideo()"
      class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-xl font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      🎲 Random Video
    </button>
  `,
})
export class RandomVideoComponent {
  constructor(private videoLinkService: VideoLinkService) {}

  openRandomVideo(): void {
    this.videoLinkService.getRandomVideo().subscribe({
      next: (randomVideo: VideoLink) => {
        if (randomVideo && randomVideo.url) {
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
