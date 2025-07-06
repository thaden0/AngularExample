import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HistoryService] });
    service = TestBed.inject(HistoryService);
  });

  it('adds entry to history', () => {
    expect(service.history().length).toBe(0);
    service.add({
      title: 'test',
      elapsedMs: 1000,
      totalMs: 1000,
      start: new Date(0),
      end: new Date(1000)
    });
    expect(service.history().length).toBe(1);
    expect(service.history()[0].title).toBe('test');
  });
});
