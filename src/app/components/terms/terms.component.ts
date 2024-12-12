import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      <div class="container mx-auto px-4 py-12 max-w-3xl">
        <h1 class="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Terms of Use & Content Policy
        </h1>
        
        <div class="prose prose-invert prose-purple max-w-none">
          <h2 class="text-2xl font-semibold mb-4 text-purple-300">1. Introduction</h2>
          <p class="mb-6">
            Welcome to random.video! By using our platform, you agree to these Terms of Use and Content Policy.
            Please read them carefully. If you do not agree, do not use the platform.
          </p>

          <h2 class="text-2xl font-semibold mb-4 text-purple-300">2. Service Description</h2>
          <p class="mb-6">
            random.video provides a platform where users can:
          </p>
          <ul class="list-disc pl-6 mb-6">
            <li>Submit links from approved (whitelisted) platforms</li>
            <li>Randomly redirect to user-submitted links using a redirection button</li>
          </ul>

          <h2 class="text-2xl font-semibold mb-4 text-purple-300">3. Approved Platforms</h2>
          <p class="mb-4">Links submitted to our platform must originate from the following approved domains:</p>
          <ul class="list-disc pl-6 mb-6">
            <li>youtube.com</li>
            <li>vimeo.com</li>
          </ul>

          <h2 class="text-2xl font-semibold mb-4 text-purple-300">4. Prohibited Content</h2>
          <p class="mb-4">You are prohibited from submitting links that:</p>
          <ul class="list-disc pl-6 mb-6">
            <li>Lead to illegal or harmful content</li>
            <li>Contain copyright-infringing material</li>
            <li>Link to malware or phishing sites</li>
            <li>Are misleading or deceptive</li>
          </ul>

          <h2 class="text-2xl font-semibold mb-4 text-purple-300">5. Privacy</h2>
          <p class="mb-6">
            We do not collect or store any personal information or user data. To enforce publishing 
            limitations, we store a temporary cookie on your device. This cookie contains no personal 
            or identifiable information and is deleted automatically after a short period.
          </p>

          <div class="mt-8 mb-8">
            <a 
              routerLink="/" 
              class="text-purple-400 hover:text-purple-300 transition-colors underline"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TermsComponent {}