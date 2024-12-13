import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { VideoLink } from '../models/video-link.model';
import { Host } from "../models/host.model";

@Injectable({
  providedIn: 'root'
})
export class VideoLinkService {
  private videoLinks: VideoLink[] = [];
  private videoLinksSubject = new BehaviorSubject<VideoLink[]>([]);

  constructor(private readonly http: HttpClient) {}

  getVideoLinks(): Observable<VideoLink[]> {
    return this.videoLinksSubject.asObservable();
  }

  addVideoLink(url: string): Observable<VideoLink> {
    return this.http.post<VideoLink>('/api/submit', { url });
  }

  getRandomVideo(): Observable<VideoLink> {
    return this.http.get<VideoLink>('/api/random');
  }

  getHosts(): Observable<Host[]> {
    return of([
      {
        id: 1,
        name: "youtube.com",
        enabled: true,
      } as Host,
      {
        id: 2,
        name: "vimeo.com",
        enabled: true,
      } as Host
    ]);
  }
}