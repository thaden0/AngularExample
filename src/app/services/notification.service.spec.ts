import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    service = new NotificationService();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    delete (window as any).Notification;
  });

  it('uses Notification API when permission is granted', () => {
    const notifySpy = jasmine.createSpy('Notification');
    (window as any).Notification = function (msg: string) {
      notifySpy(msg);
    } as any;
    (window as any).Notification.permission = 'granted';
    service.notify('hello');
    expect(notifySpy).toHaveBeenCalledWith('hello');
  });

  it('falls back to alert when Notification is unavailable', () => {
    const alertSpy = jasmine.createSpy('alert');
    (window as any).alert = alertSpy;
    delete (window as any).Notification;
    service.notify('fallback');
    expect(alertSpy).toHaveBeenCalledWith('fallback');
  });
});
