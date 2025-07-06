import { signal } from '@angular/core';
import { HistoryComponent } from './history.component';
import { HistoryService, TimerHistory } from '../services/history.service';
import { TimerService, Timer } from '../services/timer.service';

class MockHistoryService {
  history = signal<TimerHistory[]>([]);
}

class MockTimerService {
  timers = signal<Timer[]>([]);
  cancel = jasmine.createSpy('cancel');
}

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let historySvc: MockHistoryService;
  let timerSvc: MockTimerService;

  beforeEach(() => {
    historySvc = new MockHistoryService();
    timerSvc = new MockTimerService();
    component = new HistoryComponent(historySvc as any, timerSvc as any);
  });

  it('formats elapsed time', () => {
    expect(component.format(61000)).toBe('1 minute 1 second');
  });

  it('delegates cancel to service', () => {
    component.cancel(42);
    expect(timerSvc.cancel).toHaveBeenCalledWith(42);
  });
});
