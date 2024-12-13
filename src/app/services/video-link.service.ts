import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { VideoLink } from '../models/video-link.model';
import { Host } from "../models/host.model";
import {RandomLinkFilter} from "../models/random-link-filter.model";

@Injectable({
  providedIn: 'root'
})
export class VideoLinkService {
  private lastWatchedVideoLink = new BehaviorSubject<VideoLink | undefined>({"id": 123, "url": "https://www.youtube.com/watch?v=123"} as VideoLink);

  constructor(private readonly http: HttpClient) {}


  addVideoLink(url: string): Observable<VideoLink> {
    return this.http.post<VideoLink>('/api/submit', { url });
  }

  getRandomVideo(filter: RandomLinkFilter): Observable<VideoLink> {
    return this.http.post<VideoLink>('/api/random', filter);
  }

  getHosts(): Observable<Host[]> {
    // return this.http.get<Host[]>('/api/hosts');
    return of([ {
      id: 1,
      name: 'www.youtube.com',
      enabled: true
    } as Host ]);
  }

  reportLink(link: VideoLink): Observable<VideoLink> {
    return this.http.post<VideoLink>('/api/report', { "id": link.id, "url": link.url });
  }

  setLastWatchedVideo(link: VideoLink) {
    this.lastWatchedVideoLink.next(link);
  }

  getLastWatchedVideo(): Observable<VideoLink | undefined> {
    return this.lastWatchedVideoLink.asObservable()
  }
}