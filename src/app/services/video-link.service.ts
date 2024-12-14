import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import { VideoLink } from '../models/video-link.model';
import { Host } from "../models/host.model";
import {RandomLinkFilter} from "../models/random-link-filter.model";

@Injectable({
  providedIn: 'root'
})
export class VideoLinkService {
  private lastWatchedVideoLink = new BehaviorSubject<VideoLink | undefined>(undefined);

  constructor(private readonly http: HttpClient) {}


  addVideoLink(url: string): Observable<VideoLink> {
    return this.http.post<VideoLink>('/api/submit', { url });
  }

  getRandomVideo(filter: RandomLinkFilter): Observable<VideoLink> {
    return this.http.post<VideoLink>('/api/random', filter);
  }

  getHosts(): Observable<Host[]> {
    return this.http.get<Host[]>('/api/hosts').pipe(
        map(hosts =>
            hosts.map(host => ({
              ...host,
              enabled: true
            }))
        )
    );
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