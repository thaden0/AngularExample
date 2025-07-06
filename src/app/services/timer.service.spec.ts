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
    (window as any).alert = jasmine.createSpy('alert');
    jasmine.clock().install();
  });

  afterEach(() => {
    delete (window as any).alert;
    jasmine.clock().uninstall();
  });

  it('should start and complete a timer', () => {
    service.start('t', 0, 1);
    expect(service.timers().length).toBe(1);
    jasmine.clock().tick(1000);
    expect(service.timers().length).toBe(0);
    expect(history.history().length).toBe(1);
  });

  it('cancels a running timer', () => {
    service.start('t', 0, 5);
    expect(service.timers().length).toBe(1);
    const id = service.timers()[0].id;
    service.cancel(id);
    expect(service.timers().length).toBe(0);
    expect(history.history().length).toBe(0);
  });
});
