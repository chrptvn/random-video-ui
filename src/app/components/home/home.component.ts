import { Component } from '@angular/core';
import { VideoFormComponent } from '../video-form/video-form.component';
import { VideoListComponent } from '../video-list/video-list.component';
import { RandomVideoComponent } from '../random-video/random-video.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    VideoFormComponent, 
    VideoListComponent, 
    RandomVideoComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
      <div class="container mx-auto px-4 py-12 max-w-3xl">
        <h1 class="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          random.video
        </h1>
        <div class="mb-12">
          <app-video-form />
        </div>
        <div class="text-center mb-12">
          <app-random-video />
        </div>
        <app-video-list />
        <app-footer />
      </div>
    </div>
  `
})
export class HomeComponent {}