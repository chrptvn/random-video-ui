import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoLinkService } from '../../services/video-link.service';
import { UrlValidator } from '../../utils/url-validator';
import { VideoLink } from '../../models/video-link.model';
import { VideoListComponent } from '../video-list/video-list.component';

@Component({
  selector: 'app-video-form',
  standalone: true,
  imports: [FormsModule, VideoListComponent],
  templateUrl: './video-form.component.html'
})
export class VideoFormComponent {
  url = '';
  error = '';
  videoLinks: VideoLink[] = [];

  get inputClasses(): string {
    return `flex-1 p-4 rounded-lg bg-white/10 border focus:outline-none focus:ring-2 
      ${this.error 
        ? 'border-red-500/50 focus:ring-red-500' 
        : 'border-purple-500/30 focus:ring-purple-500'
      } 
      text-white placeholder-purple-300/50`;
  }

  constructor(private videoLinkService: VideoLinkService) {}

  validateUrl(): string | null {
    if (!this.url.trim()) {
      return 'Please enter a URL';
    }

    if (!UrlValidator.isValidUrl(this.url)) {
      return 'Please enter a valid URL';
    }

    return null;
  }

  onSubmit(): void {
    this.error = '';
    
    const validationError = this.validateUrl();
    if (validationError) {
      this.error = validationError;
      this.url = '';
      return;
    }

    this.videoLinkService.addVideoLink(this.url).subscribe({
      next: (videos) => {
        this.url = '';
        this.error = '';
        this.videoLinks = videos;
      },
      error: (err) => {
        console.error('Failed to add video:', err);
        this.error = 'Failed to add video. Please try again.';
      }
    });
  }
}