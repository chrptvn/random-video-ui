import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoLink } from '../../models/video-link.model';
import { VideoLinkService } from '../../services/video-link.service';
import { VideoStatusButtonComponent } from '../video-status-button/video-status-button.component';
import {VideoPlayerComponent} from "../video-player/video-player.component";

@Component({
  selector: 'app-video-add',
  standalone: true,
  imports: [CommonModule, RouterModule, VideoStatusButtonComponent, VideoPlayerComponent],
  templateUrl: './video-add.component.html'
})
export class VideoAddComponent {
  @Input() videos: VideoLink[] = [];

  constructor(private videoLinkService: VideoLinkService) {}
}