import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoLinkService } from '../../services/video-link.service';

@Component({
  selector: 'app-video-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="flex gap-4">
      <input
        type="url"
        [(ngModel)]="url"
        name="url"
        required
        class="flex-1 p-4 rounded-lg bg-white/10 border border-purple-500/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Paste your video URL here"
      >
      <button
        type="submit"
        class="px-6 py-4 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Add
      </button>
    </form>
  `,
})
export class VideoFormComponent {
  url = '';

  constructor(private videoLinkService: VideoLinkService) {}

  onSubmit(): void {
    if (this.url) {
      this.videoLinkService.addVideoLink(this.url);
      this.url = '';
    }
  }
}