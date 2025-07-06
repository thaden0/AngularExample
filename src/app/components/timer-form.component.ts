import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-form',
  standalone: true,
  imports: [FormsModule],
  template: `
  <form class="row g-2" (ngSubmit)="set()" #f="ngForm" novalidate>
    <div class="col-12 col-md-4">
      <input class="form-control" name="title" [(ngModel)]="title" placeholder="Title" required />
    </div>
    <div class="col-4 col-md-2">
      <input type="number" class="form-control" name="minutes" [(ngModel)]="minutes" min="0" placeholder="Min" required />
    </div>
    <div class="col-4 col-md-2">
      <input type="number" class="form-control" name="seconds" [(ngModel)]="seconds" min="0" max="59" placeholder="Sec" required />
    </div>
    <div class="col-4 col-md-2">
      <button class="btn btn-primary w-100" type="submit" [disabled]="!validTime()">Set</button>
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
