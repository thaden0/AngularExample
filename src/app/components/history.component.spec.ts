import { signal } from '@angular/core';
import { HistoryComponent } from './history.component';
import { TimerService, Timer } from '../services/timer.service';
import { HistoryService, TimerHistory } from '../services/history.service';

class MockTimerService {
  timers = signal<Timer[]>([]);
  cancel = jest.fn();
}

class MockHistoryService {
  history = signal<TimerHistory[]>([]);
}

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let timerSvc: MockTimerService;

  beforeEach(() => {
    timerSvc = new MockTimerService();
    const historySvc = new MockHistoryService();
    component = new HistoryComponent(historySvc as any, timerSvc as any);
  });

  it('calculates progress percent', () => {
    const timer: Timer = {
      id: 1,
      title: 't',
      totalMs: 1000,
      remainingMs: 500,
      start: new Date(),
      end: new Date(),
      running: true
    };
    expect(component.progress(timer)).toBe(50);
  });

  it('formats remaining time', () => {
    expect(component.display(90000)).toBe('01:30');
  });

  it('delegates cancel to service', () => {
    component.cancel(42);
    expect(timerSvc.cancel).toHaveBeenCalledWith(42);
  });

  it('formats elapsed time', () => {
    expect(component.format(61000)).toBe('1 minute 1 second');
  });
});
