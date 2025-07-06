import { Component } from '@angular/core';
import { TimerFormComponent } from './components/timer-form.component';
import { TimerDisplayComponent } from './components/timer-display.component';
import { HistoryComponent } from './components/history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimerFormComponent, TimerDisplayComponent, HistoryComponent],
  template: `
  <div class="container py-4">
    <h1 class="mb-4">Angular Timer</h1>
    <app-timer-form></app-timer-form>
    <app-timer-display></app-timer-display>
    <app-history></app-history>
  </div>`
})
export class App {}
