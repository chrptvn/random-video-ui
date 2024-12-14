import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-age-verification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './age-verification.component.html',
})
export class AgeVerificationComponent {
  @Output() verified = new EventEmitter<void>();
  @Output() rejected = new EventEmitter<void>();

  onVerify(): void {
    this.verified.emit();
    localStorage.setItem('age-verified', 'true');
  }

  onReject(): void {
    this.rejected.emit();
    window.location.href = 'https://www.google.com';
  }
}