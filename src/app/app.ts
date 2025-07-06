import { Component } from '@angular/core';
import { TimerFormComponent } from './components/timer-form.component';
import { HistoryComponent } from './components/history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimerFormComponent, HistoryComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}
