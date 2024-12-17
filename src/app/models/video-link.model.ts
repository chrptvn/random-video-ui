import { VideoStatus } from './video-status.enum';

export interface VideoLink {
  url: string;
  video: string;
  status: VideoStatus;
}