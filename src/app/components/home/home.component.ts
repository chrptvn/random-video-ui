import { Component } from '@angular/core';
import { VideoFormComponent } from '../video-form/video-form.component';
import { CurrentVideoComponent } from '../current-video/current-video.component';
import { RandomVideoComponent } from '../random-video/random-video.component';
import { FooterComponent } from '../footer/footer.component';
import { AsyncPipe, NgIf } from "@angular/common";
import { AgeVerificationComponent } from '../age-verification/age-verification.component';
import { VideoAddComponent } from '../video-add/video-add.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    VideoFormComponent,
    CurrentVideoComponent,
    RandomVideoComponent,
    FooterComponent,
    NgIf,
    AsyncPipe,
    AgeVerificationComponent,
    VideoAddComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  showAgeVerification = !localStorage.getItem('age-verified');

  onAgeVerified(): void {
    this.showAgeVerification = false;
  }

  onAgeRejected(): void {
    // Handled in the component
  }
}