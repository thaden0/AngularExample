import { Injectable, signal, inject } from '@angular/core';
import { NotificationService } from './notification.service';
import { HistoryService } from './history.service';

export interface Timer {
  id: number;
  title: string;
  totalMs: number;
  remainingMs: number;
  start: Date;
  end: Date;
  running: boolean;
}

@Injectable({ providedIn: 'root' })
export class TimerService {
  private history = inject(HistoryService);
  private notifySvc = inject(NotificationService);

  private timersSignal = signal<Timer[]>([]);
  readonly timers = this.timersSignal.asReadonly();

  private nextId = 1;
  private intervals = new Map<number, any>();

  start(title: string, minutes: number, seconds: number): void {
    const totalMs = (minutes * 60 + seconds) * 1000;
    if (totalMs <= 0) return;
    const start = new Date();
    const end = new Date(start.getTime() + totalMs);
    const timer: Timer = {
      id: this.nextId++,
      title,
      totalMs,
      remainingMs: totalMs,
      start,
      end,
      running: true
    };
    this.timersSignal.update(list => [...list, timer]);
    const intervalId = setInterval(() => {
      this.tick(timer.id);
    }, 1000);
    this.intervals.set(timer.id, intervalId);
  }

  cancel(id: number): void {
    const timer = this.timersSignal().find(t => t.id === id);
    if (!timer) return;
    clearInterval(this.intervals.get(id));
    this.intervals.delete(id);
    this.timersSignal.update(list => list.filter(t => t.id !== id));
  }

  private tick(id: number): void {
    this.timersSignal.update(list =>
      list.map(t => {
        if (t.id !== id) return t;
        const remaining = t.remainingMs - 1000;
        if (remaining <= 0) {
          this.complete(t);
          return t;
        }
        return { ...t, remainingMs: remaining };
      })
    );
  }

  private complete(timer: Timer): void {
    clearInterval(this.intervals.get(timer.id));
    this.intervals.delete(timer.id);
    this.timersSignal.update(list => list.filter(t => t.id !== timer.id));
    this.history.add({
      title: timer.title,
      elapsedMs: timer.totalMs,
      totalMs: timer.totalMs,
      start: timer.start,
      end: new Date()
    });
    this.notifySvc.notify(`Timer finished: ${timer.title}`);
  }
}
