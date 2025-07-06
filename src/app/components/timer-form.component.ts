import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-form',
  standalone: true,
  imports: [FormsModule],
  template: `
  <form class="row g-3 align-items-end" (ngSubmit)="set()" #f="ngForm" novalidate>
    <div class="col-12 col-md-4">
      <label for="title" class="form-label">Title</label>
      <input id="title" class="form-control" name="title" [(ngModel)]="title" required />
    </div>
    <div class="col-4 col-md-2">
      <label for="minutes" class="form-label">Minutes</label>
      <input id="minutes" type="number" class="form-control" name="minutes" [(ngModel)]="minutes" min="0" required />
    </div>
    <div class="col-4 col-md-2">
      <label for="seconds" class="form-label">Seconds</label>
      <input id="seconds" type="number" class="form-control" name="seconds" [(ngModel)]="seconds" min="0" max="59" required />
    </div>
    <div class="col-4 col-md-2 d-grid">
      <button class="btn btn-primary" type="submit" [disabled]="!validTime()">Set</button>
    </div>
  </form>`
})
export class TimerFormComponent {
  title = '';
  minutes = 0;
  seconds = 0;

  constructor(private timer: TimerService) {}

  validTime(): boolean {
    return this.minutes > 0 || this.seconds > 0;
  }

  set(): void {
    if (this.validTime()) {
      this.timer.start(this.title, this.minutes, this.seconds);
    }
  }
}
