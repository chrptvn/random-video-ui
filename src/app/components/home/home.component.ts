import { Component } from '@angular/core';
import { VideoFormComponent } from '../video-form/video-form.component';
import { LastSeenVideoLinkComponent } from '../last-seen-video-link/last-seen-video-link.component';
import { RandomVideoComponent } from '../random-video/random-video.component';
import { FooterComponent } from '../footer/footer.component';
import { VideoLinkService } from "../../services/video-link.service";
import { Host } from "../../models/host.model";
import { Observable } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";
import { AgeVerificationComponent } from '../age-verification/age-verification.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    VideoFormComponent,
    LastSeenVideoLinkComponent,
    RandomVideoComponent,
    FooterComponent,
    NgIf,
    AsyncPipe,
    AgeVerificationComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  hosts$: Observable<Host[]> = this.videoLinkService.getHosts();
  showAgeVerification = !localStorage.getItem('age-verified');

  constructor(private videoLinkService: VideoLinkService) {}

  onAgeVerified(): void {
    this.showAgeVerification = false;
  }

  onAgeRejected(): void {
    // Handled in the component
  }
}