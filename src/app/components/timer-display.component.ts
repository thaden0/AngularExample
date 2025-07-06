import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-display',
  standalone: true,
  imports: [NgIf],
  template: `
  <div *ngIf="state().running" class="mt-3" role="timer" aria-live="polite">
    <div class="progress mb-2" *ngIf="state().totalMs">
      <div class="progress-bar" [style.width.%]="(1 - progress()) * 100"></div>
    </div>
    <h2 class="h5">{{state().title}}: {{display(state().remainingMs)}}</h2>
    <button class="btn btn-secondary btn-sm" (click)="cancel()">Cancel</button>
  </div>`
})
export class TimerDisplayComponent {
  constructor(private svc: TimerService) {}
  state = this.svc.state;
  progress = this.svc.progress;

  cancel(): void {
    this.svc.cancel();
  }

  display(ms: number): string {
    const totalSeconds = Math.ceil(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }
}
