import { render, screen } from '@testing-library/angular';
import { TimerDisplayComponent } from './timer-display.component';
import { TimerService } from '../services/timer.service';
import { HistoryService } from '../services/history.service';
import { NotificationService } from '../services/notification.service';

describe('TimerDisplayComponent', () => {
  it('renders timer with aria attributes', async () => {
    const { fixture } = await render(TimerDisplayComponent, {
      providers: [TimerService, HistoryService, NotificationService]
    });
    const svc = fixture.componentRef.injector.get(TimerService);
    svc.start('t', 0, 1);
    fixture.detectChanges();
    expect(screen.getByRole('timer')).toHaveAttribute('aria-live', 'polite');
  });
});
