import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { HistoryService } from '../services/history.service';
import { formatDuration, intervalToDuration } from 'date-fns';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgFor],
  template: `
  <div *ngIf="history().length" class="mt-4">
    <h3 class="h6">History</h3>
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let item of history()">
        <strong>{{item.title}}</strong>
        <small class="d-block">{{format(item.elapsedMs)}}</small>
      </li>
    </ul>
  </div>`
})
export class HistoryComponent {
  constructor(private historySvc: HistoryService) {}
  history = this.historySvc.history;

  format(ms: number): string {
    return formatDuration(intervalToDuration({start:0,end:ms}));
  }
}
