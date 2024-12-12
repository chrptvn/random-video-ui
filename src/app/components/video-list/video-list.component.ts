import { Component } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoLink } from '../../models/video-link.model';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  template: `
    <div class="space-y-4">
      @for (video of videoLinks$ | async; track video.id) {
        <div class="p-4 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-lg hover:bg-white/10 transition-colors duration-200">
          <a [href]="video.url" 
             target="_blank" 
             class="text-purple-300 hover:text-purple-200 break-all">
            {{ video.url }}
          </a>
          <p class="text-sm text-purple-400/60 mt-2">Added {{ video.addedAt | date:'MMM d, y, h:mm a' }}</p>
        </div>
      }
    </div>
  `,
})
export class VideoListComponent {
  videoLinks$ = this.videoLinkService.getVideoLinks();

  constructor(private videoLinkService: VideoLinkService) {}
}