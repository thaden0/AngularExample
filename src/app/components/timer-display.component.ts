import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { TimerService, Timer } from '../services/timer.service';

@Component({
  selector: 'app-timer-display',
  standalone: true,
  imports: [NgIf],
  template: `
  <div *ngIf="current()" class="mt-3" role="timer" aria-live="polite">
    <h2 class="h5">{{current()?.title}}: {{display(current()?.remainingMs || 0)}}</h2>
    <button class="btn btn-secondary btn-sm" (click)="cancel()">Cancel</button>
  </div>`
})
export class TimerDisplayComponent {
  constructor(private svc: TimerService) {}
  get current() { return () => this.svc.timers().at(0); }

  cancel(): void {
    const t = this.svc.timers().at(0);
    if (t) this.svc.cancel(t.id);
  }

  display(ms: number): string {
    const totalSeconds = Math.ceil(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }
}
