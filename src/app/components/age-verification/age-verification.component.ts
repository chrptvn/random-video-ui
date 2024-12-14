import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-age-verification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div class="bg-purple-900 p-8 rounded-lg max-w-md w-full border border-purple-500/20">
        <h2 class="text-2xl font-bold mb-4 text-white">Age Verification Required</h2>
        <p class="text-purple-200 mb-6">
          This website contains adult content. You must be at least 18 years old to enter.
        </p>
        <div class="flex flex-col gap-4">
          <button
            (click)="onVerify()"
            class="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
          >
            I am 18 or older
          </button>
          <button
            (click)="onReject()"
            class="w-full px-6 py-3 bg-purple-900 text-purple-300 border border-purple-500/20 rounded-lg font-semibold hover:bg-purple-800 transition-colors duration-200"
          >
            I am under 18
          </button>
        </div>
        <div class="mt-4 text-center">
          <a
            routerLink="/terms"
            class="text-purple-400 hover:text-purple-300 text-sm underline"
          >
            Content Policy
          </a>
        </div>
      </div>
    </div>
  `
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