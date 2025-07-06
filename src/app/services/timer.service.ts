import { Injectable, signal, inject, computed } from "@angular/core";
import { NotificationService } from "./notification.service";
import { HistoryService } from './history.service';

export interface TimerState {
  title: string;
  totalMs: number;
  remainingMs: number;
  start?: Date;
  end?: Date;
  running: boolean;
}

@Injectable({ providedIn: 'root' })
export class TimerService {
    private history = inject(HistoryService);
  private notifySvc = inject(NotificationService);
  private stateSignal = signal<TimerState>({
    title: '',
    totalMs: 0,
    remainingMs: 0,
    running: false
  });
  readonly state = this.stateSignal.asReadonly();
  readonly progress = computed(() => {
    const s = this.stateSignal();
    return s.totalMs ? s.remainingMs / s.totalMs : 0;
  });
  private intervalId: any;

  start(title: string, minutes: number, seconds: number): void {
    const totalMs = (minutes * 60 + seconds) * 1000;
    if (totalMs <= 0) return;
    const start = new Date();
    const end = new Date(start.getTime() + totalMs);
    clearInterval(this.intervalId);
    this.stateSignal.set({ title, totalMs, remainingMs: totalMs, start, end, running: true });
    this.intervalId = setInterval(() => {
      const remaining = this.stateSignal().remainingMs - 1000;
      if (remaining <= 0) {
        this.complete();
      } else {
        this.stateSignal.update(s => ({ ...s, remainingMs: remaining }));
      }
    }, 1000);
  }

  cancel(): void {
    if (this.stateSignal().running) {
      clearInterval(this.intervalId);
      this.stateSignal.update(s => ({ ...s, running: false }));
    }
  }

  private complete(): void {
    clearInterval(this.intervalId);
    const current = this.stateSignal();
    this.history.add({
      title: current.title,
      elapsedMs: current.totalMs,
      totalMs: current.totalMs,
      start: current.start!,
      end: new Date()
    });
    this.notifySvc.notify(`Timer finished: ${current.title}`);
    this.stateSignal.set({ title: "", totalMs: 0, remainingMs: 0, running: false });
  }
}
