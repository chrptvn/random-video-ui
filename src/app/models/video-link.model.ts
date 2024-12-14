import { VideoStatus } from './video-status.enum';

export interface VideoLink {
  id: number;
  url: string;
  video: string;
  status: VideoStatus;
}