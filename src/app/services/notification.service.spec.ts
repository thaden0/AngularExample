import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    service = new NotificationService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete (global as any).Notification;
  });

  it('uses Notification API when permission is granted', () => {
    const notifySpy = jest.fn();
    (global as any).Notification = function (msg: string) {
      notifySpy(msg);
    } as any;
    (global as any).Notification.permission = 'granted';
    service.notify('hello');
    expect(notifySpy).toHaveBeenCalledWith('hello');
  });

  it('falls back to alert when Notification is unavailable', () => {
    const alertSpy = jest.fn();
    (global as any).alert = alertSpy;
    service.notify('fallback');
    expect(alertSpy).toHaveBeenCalledWith('fallback');
  });
});
