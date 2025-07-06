import { TestBed } from '@angular/core/testing';
import { TimerService } from './timer.service';
import { HistoryService } from './history.service';
import { NotificationService } from './notification.service';

describe('TimerService', () => {
  let service: TimerService;
  let history: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TimerService, HistoryService, NotificationService] });
    service = TestBed.inject(TimerService);
    history = TestBed.inject(HistoryService);
    (global as any).alert = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    delete (global as any).alert;
    jest.useRealTimers();
  });

  it('should start and complete a timer', () => {
    service.start('t', 0, 1);
    expect(service.timers().length).toBe(1);
    jest.advanceTimersByTime(1000);
    expect(service.timers().length).toBe(0);
    expect(history.history().length).toBe(1);
  });

  it('cancels a running timer', () => {
    service.start('t', 0, 5);
    const id = service.timers()[0].id;
    service.cancel(id);
    expect(service.timers().length).toBe(0);
    expect(history.history().length).toBe(0);
  });
});
