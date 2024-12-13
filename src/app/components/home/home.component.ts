import {Component} from '@angular/core';
import { VideoFormComponent } from '../video-form/video-form.component';
import { LastSeenVideoLinkComponent } from '../last-seen-video-link/last-seen-video-link.component';
import { RandomVideoComponent } from '../random-video/random-video.component';
import { FooterComponent } from '../footer/footer.component';
import {VideoLinkService} from "../../services/video-link.service";
import {Host} from "../../models/host.model";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    VideoFormComponent,
    LastSeenVideoLinkComponent,
    RandomVideoComponent,
    FooterComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  hosts$: Observable<Host[]> = this.videoLinkService.getHosts();

  constructor(private videoLinkService: VideoLinkService) {}
}