import { render, screen, fireEvent } from '@testing-library/angular';
import { TimerFormComponent } from './timer-form.component';
import { TimerService } from '../services/timer.service';
import { HistoryService } from '../services/history.service';
import { NotificationService } from '../services/notification.service';

describe('TimerFormComponent', () => {
  it('disables set when time is zero', async () => {
    await render(TimerFormComponent, {
      providers: [TimerService, HistoryService, NotificationService]
    });
    const button = screen.getByRole('button', { name: /set/i });
    expect(button).toBeDisabled();
  });
});
