import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VideoLinkService } from '../../services/video-link.service';
import { RecaptchaService } from '../../services/recaptcha.service';
import { UrlValidator } from '../../utils/url-validator';
import { VideoLink } from '../../models/video-link.model';
import { VideoAddComponent } from '../video-add/video-add.component';
import { RecaptchaComponent } from '../recaptcha/recaptcha.component';
import { BehaviorSubject, catchError, map, mergeMap, Observable, of, tap } from "rxjs";
import { AsyncPipe, CommonModule } from "@angular/common";

@Component({
  selector: 'app-video-form',
  standalone: true,
  imports: [FormsModule, VideoAddComponent, AsyncPipe, CommonModule, RecaptchaComponent],
  templateUrl: './video-form.component.html'
})
export class VideoFormComponent {
  url = '';
  error = '';
  recaptchaToken: string | null = null;

  videoLinks$: Observable<VideoLink[]> = this.videoLinkService.getVideosToAdd();

  get inputClasses(): string {
    return `flex-1 p-4 rounded-lg bg-white/10 border focus:outline-none focus:ring-2 
      ${this.error 
        ? 'border-red-500/50 focus:ring-red-500' 
        : 'border-purple-500/30 focus:ring-purple-500'
      } 
      text-white placeholder-purple-300/50`;
  }

  constructor(
    private videoLinkService: VideoLinkService,
    private recaptchaService: RecaptchaService
  ) {}

  validateUrl(): string | null {
    if (!this.url.trim()) {
      return 'Please enter a URL';
    }

    if (!UrlValidator.isValidUrl(this.url)) {
      return 'Please enter a valid URL';
    }

    return null;
  }

  onRecaptchaVerified(token: string) {
    this.recaptchaToken = token;
  }

  onSubmit(): void {
    this.error = '';

    if (!this.recaptchaToken) {
      this.error = 'Please complete the reCAPTCHA verification';
      return;
    }

    const validationError = this.validateUrl();
    if (validationError) {
      this.error = validationError;
      this.url = '';
      return;
    }

    this.recaptchaService.verifyToken(this.recaptchaToken).pipe(
      mergeMap(isValid => {
        if (!isValid) {
          throw new Error('reCAPTCHA verification failed');
        }
        return this.videoLinkService.submitUrl(this.url);
      })
    ).subscribe({
      next: (videos) => {
        this.url = '';
        this.error = '';
        this.recaptchaToken = null;
        this.videoLinkService.setVideosToAdd(videos);
        this.videoLinkService.setCurrentVideoLink(undefined);
      },
      error: (err) => {
        console.error('Failed to add video:', err);
        this.error = err.message || 'Failed to add video. Please try again.';
      }
    });
  }
}