import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import {AsyncPipe, NgFor} from "@angular/common";

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterModule, NgFor, AsyncPipe],
  templateUrl: './terms.component.html'
})
export class TermsComponent {
}