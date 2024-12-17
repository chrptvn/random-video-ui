import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { VideoLink } from '../models/video-link.model';
import { RandomLinkFilter } from "../models/random-link-filter.model";
import {VideoStatus} from "../models/video-status.enum";

@Injectable({
  providedIn: 'root'
})
export class VideoLinkService {
  private currentVideoLink = new BehaviorSubject<VideoLink | undefined>(undefined);
  private videosToAdd = new BehaviorSubject<VideoLink[]>([]);

  constructor(private readonly http: HttpClient) {}

  submitUrl(url: string): Observable<VideoLink[]> {
    return this.http.post<VideoLink[]>('/api/submit', { url }).pipe(
        map(links =>
            links.map(link => ({
            ...link,
            status: VideoStatus.FETCHED
            }))
        )
    );
  }

  saveVideoLink(videoLink: VideoLink): Observable<VideoLink> {
    return this.http.post<undefined>('/api/save', videoLink).pipe(
        map(() => {
            videoLink.status = VideoStatus.READY;
            return videoLink;
        })
    );
  }

  getRandomVideo(filter: RandomLinkFilter): Observable<VideoLink> {
    return this.http.post<VideoLink>('/api/random', filter).pipe(
        map(link => {
            link.status = VideoStatus.ACTIVE;
            return link;
        })
    )
  }

  reportLink(link: VideoLink): Observable<VideoLink> {
    return this.http.post<VideoLink>('/api/report', { "video": link.video }).pipe(
        map(() => {
            link.status = VideoStatus.REPORTED;
            return link;
        })
    );
  }

  setCurrentVideoLink(link: VideoLink | undefined) {
    this.currentVideoLink.next(link);
  }

  getCurrentVideoLink(): Observable<VideoLink | undefined> {
    return this.currentVideoLink.asObservable();
  }

  setVideosToAdd(videos: VideoLink[]) {
    this.videosToAdd.next(videos);
  }

    getVideosToAdd(): Observable<VideoLink[]> {
        return this.videosToAdd.asObservable();
    }
}