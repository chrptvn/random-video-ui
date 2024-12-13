import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoLink } from '../../models/video-link.model';
import { Host } from '../../models/host.model';

@Component({
  selector: 'app-random-video',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex gap-4 justify-center items-center">
      <button
        (click)="openRandomVideo()"
        class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-xl font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        🎲 Random Video
      </button>

      <div class="relative">
        <button
          (click)="toggleFilter()"
          [class.bg-purple-700]="showFilter"
          class="px-4 py-4 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
        >
          <span>🎯 Filter</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fill-rule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clip-rule="evenodd" 
            />
          </svg>
        </button>

        @if (showFilter) {
          <div class="absolute right-0 mt-2 w-48 bg-purple-800 rounded-lg shadow-xl z-10 border border-purple-600">
            <div class="p-3">
              <div class="text-sm font-semibold mb-2 text-purple-200">Select Hosts</div>
              @for (host of hosts; track host.id) {
                <label class="flex items-center space-x-2 py-1 cursor-pointer hover:bg-purple-700/50 px-2 rounded">
                  <input
                    type="checkbox"
                    [checked]="host.enabled"
                    (change)="toggleHost(host)"
                    class="form-checkbox h-4 w-4 text-purple-500 rounded focus:ring-purple-500 focus:ring-offset-0 bg-purple-900 border-purple-600"
                  >
                  <span class="text-sm text-purple-200">{{ host.name }}</span>
                </label>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class RandomVideoComponent implements OnInit {
  hosts: Host[] = [];
  showFilter = false;

  constructor(private videoLinkService: VideoLinkService) {}

  ngOnInit() {
    this.videoLinkService.getHosts().subscribe(hosts => {
      this.hosts = hosts;
    });
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  toggleHost(host: Host): void {
    host.enabled = !host.enabled;
    // In a real application, you might want to persist this state
    // this.videoLinkService.updateHostPreferences(this.hosts);
  }

  openRandomVideo(): void {
    const enabledHosts = this.hosts
      .filter(host => host.enabled)
      .map(host => host.name);

    if (enabledHosts.length === 0) {
      alert('Please select at least one host');
      return;
    }

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