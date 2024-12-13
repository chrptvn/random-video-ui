import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoLink } from '../../models/video-link.model';
import { Host } from '../../models/host.model';
import {RandomLinkFilter} from "../../models/random-link-filter.model";

@Component({
  selector: 'app-random-video',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './random-video.component.html'
})
export class RandomVideoComponent {

  @Input()
  hosts: Host[] = [];

  showFilter = false;

  constructor(private videoLinkService: VideoLinkService) {}

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
      .map(host => host.id);

    if (enabledHosts.length === 0) {
      alert('Please select at least one host');
      return;
    }

    this.videoLinkService.getRandomVideo({hostIds: enabledHosts, excludedLinkIds: []} as RandomLinkFilter).subscribe({
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