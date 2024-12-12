import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VideoLink } from '../models/video-link.model';

@Injectable({
  providedIn: 'root'
})
export class VideoLinkService {
  private videoLinks: VideoLink[] = [];
  private videoLinksSubject = new BehaviorSubject<VideoLink[]>([]);

  constructor(
      private readonly http: HttpClient,
  ) {}

  getVideoLinks(): Observable<VideoLink[]> {
    return this.videoLinksSubject.asObservable();
  }

  addVideoLink(url: string): void {
    this.http.post<VideoLink>('/submit', { url })
        .subscribe(link => {
          this.videoLinks.push(link);
          this.videoLinksSubject.next([...this.videoLinks]);
        });
  }

  getRandomVideo(): Observable<VideoLink> {
    return this.http.get<VideoLink>('/random');
  }
}