import { Injectable, signal } from '@angular/core';

export interface TimerHistory {
  title: string;
  elapsedMs: number;
  totalMs: number;
  start: Date;
  end: Date;
}

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private readonly entries = signal<TimerHistory[]>([]);
  readonly history = this.entries.asReadonly();

  add(entry: TimerHistory): void {
    this.entries.update(list => [entry, ...list]);
  }
}
