import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Host } from '../../models/host.model';

@Component({
  selector: 'app-video-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-filter.component.html'
})
export class VideoFilterComponent {
  @Input() hosts: Host[] = [];
  @Input() showFilter = false;
  @Output() showFilterChange = new EventEmitter<boolean>();
  @Output() hostToggled = new EventEmitter<Host>();

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.filter-container')) {
      this.showFilter = false;
      this.showFilterChange.emit(false);
    }
  }

  toggleFilter(event: MouseEvent): void {
    event.stopPropagation();
    this.showFilter = !this.showFilter;
    this.showFilterChange.emit(this.showFilter);
  }

  onHostToggle(host: Host, event: MouseEvent): void {
    event.stopPropagation();
    this.hostToggled.emit(host);
  }
}