import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoLinkService } from '../../services/video-link.service';
import { UrlValidator } from '../../utils/url-validator';
import { Host } from '../../models/host.model';

@Component({
  selector: 'app-video-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <form (ngSubmit)="onSubmit()" class="flex gap-4">
        <input
          type="url"
          [(ngModel)]="url"
          name="url"
          required
          [class]="inputClasses"
          placeholder="Paste your video URL here"
        >
        <button
          type="submit"
          class="px-6 py-4 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Add
        </button>
      </form>
      
      @if (error) {
        <div class="mt-2 text-red-400 text-sm">
          {{ error }}
        </div>
      }
    </div>
  `,
})
export class VideoFormComponent implements OnInit {
  url = '';
  error = '';
  hosts: Host[] = [];

  get inputClasses(): string {
    return `flex-1 p-4 rounded-lg bg-white/10 border focus:outline-none focus:ring-2 
      ${this.error 
        ? 'border-red-500/50 focus:ring-red-500' 
        : 'border-purple-500/30 focus:ring-purple-500'
      } 
      text-white placeholder-purple-300/50`;
  }

  constructor(private videoLinkService: VideoLinkService) {}

  ngOnInit() {
    this.videoLinkService.getHosts().subscribe(hosts => {
      this.hosts = hosts;
    });
  }

  validateUrl(): string | null {
    if (!this.url.trim()) {
      return 'Please enter a URL';
    }

    if (!UrlValidator.isValidUrl(this.url)) {
      return 'Please enter a valid URL';
    }

    if (!UrlValidator.isHostWhitelisted(this.url, this.hosts)) {
      const allowedHosts = this.hosts
        .filter(host => host.enabled)
        .map(host => host.name)
        .join(', ');
      return `URL must be from one of these hosts: ${allowedHosts}`;
    }

    return null;
  }

  onSubmit(): void {
    this.error = '';
    
    const validationError = this.validateUrl();
    if (validationError) {
      this.error = validationError;
      return;
    }

    this.videoLinkService.addVideoLink(this.url).subscribe({
      next: () => {
        this.url = '';
        this.error = '';
      },
      error: (err) => {
        console.error('Failed to add video:', err);
        this.error = 'Failed to add video. Please try again.';
      }
    });
  }
}