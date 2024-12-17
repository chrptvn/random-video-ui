import { Component, EventEmitter, Output } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-recaptcha',
  standalone: true,
  imports: [RecaptchaModule],
  template: `
    <re-captcha
      siteKey="YOUR_SITE_KEY"
      (resolved)="onResolved($event)"
    ></re-captcha>
  `
})
export class RecaptchaComponent {
  @Output() verified = new EventEmitter<string>();

  onResolved(token: string | null) {
    if (token) {
      this.verified.emit(token);
    }
  }
}