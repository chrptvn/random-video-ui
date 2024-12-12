import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="mt-12 text-center text-sm text-purple-400/60">
      <a 
        routerLink="/terms" 
        class="hover:text-purple-300 transition-colors underline"
      >
        Terms of Use & Content Policy
      </a>
    </footer>
  `
})
export class FooterComponent {}