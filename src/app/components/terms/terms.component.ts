import {Component, Input} from '@angular/core';
import { RouterModule } from '@angular/router';
import {Host} from "../../models/host.model";
import {AsyncPipe, NgFor} from "@angular/common";
import {Observable} from "rxjs";
import {VideoLinkService} from "../../services/video-link.service";

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterModule, NgFor, AsyncPipe],
  templateUrl: './terms.component.html'
})
export class TermsComponent {
  hosts$: Observable<Host[]> = this.videoLinkService.getHosts();

  constructor(private videoLinkService: VideoLinkService) {}
}