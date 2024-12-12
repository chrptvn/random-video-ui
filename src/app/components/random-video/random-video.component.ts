import { Component } from '@angular/core';
import { VideoLinkService } from '../../services/video-link.service';

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
    const randomVideo = this.videoLinkService.getRandomVideo();
    if (randomVideo) {
      window.open(randomVideo.url, '_blank');
    } else {
      alert('No videos available');
    }
  }
}