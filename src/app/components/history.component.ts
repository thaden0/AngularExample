import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HistoryService } from '../services/history.service';
import { TimerService, Timer } from '../services/timer.service';
import { formatDuration, intervalToDuration } from 'date-fns';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
  <div>
    <div *ngIf="running().length" class="mb-4">
      <h3 class="h6">Active Timers</h3>
      <ul class="list-group">
        <li class="list-group-item" *ngFor="let t of running()">
          <div class="progress mb-2" *ngIf="t.totalMs">
            <div class="progress-bar" [style.width.%]="progress(t)"></div>
          </div>
          <strong>{{t.title}}</strong>
          <small class="d-block">{{display(t.remainingMs)}}</small>
          <button class="btn btn-secondary btn-sm mt-1" (click)="cancel(t.id)">Cancel</button>
        </li>
      </ul>
    </div>
    <div *ngIf="history().length">
      <h3 class="h6">History</h3>
      <ul class="list-group">
        <li class="list-group-item" *ngFor="let item of history()">
          <strong>{{item.title}}</strong>
          <small class="d-block">{{format(item.elapsedMs)}}</small>
        </li>
      </ul>
    </div>
  </div>`
})
export class HistoryComponent {
  constructor(private historySvc: HistoryService, private timersSvc: TimerService) {}
  get history() { return this.historySvc.history; }
  get running() { return this.timersSvc.timers; }

  progress(t: Timer): number {
    return ((t.totalMs - t.remainingMs) / t.totalMs) * 100;
  }

  display(ms: number): string {
    const totalSeconds = Math.ceil(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  cancel(id: number): void {
    this.timersSvc.cancel(id);
  }

  format(ms: number): string {
    return formatDuration(intervalToDuration({start:0,end:ms}));
  }
}
