import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VideoLink } from '../models/video-link.model';

@Injectable({
  providedIn: 'root'
})
export class VideoLinkService {
  private videoLinks: VideoLink[] = [];
  private videoLinksSubject = new BehaviorSubject<VideoLink[]>([]);

  getVideoLinks(): Observable<VideoLink[]> {
    return this.videoLinksSubject.asObservable();
  }

  addVideoLink(url: string): void {
    const newLink: VideoLink = {
      id: crypto.randomUUID(),
      url,
      addedAt: new Date()
    };
    this.videoLinks.push(newLink);
    this.videoLinksSubject.next([...this.videoLinks]);
  }

  getRandomVideo(): VideoLink | null {
    if (this.videoLinks.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.videoLinks.length);
    return this.videoLinks[randomIndex];
  }
}