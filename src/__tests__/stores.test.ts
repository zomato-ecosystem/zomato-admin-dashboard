import { useAuthStore } from '@/stores/authStore';
import { useNotificationsStore } from '@/stores/notificationsStore';

describe('Auth Store', () => {
    beforeEach(() => {
        useAuthStore.getState().logout();
    });

    it('should start with no user', () => {
        const { user, isAuthenticated } = useAuthStore.getState();
        expect(user).toBeNull();
        expect(isAuthenticated).toBe(false);
    });

    it('should login and set user', () => {
        const mockUser = { id: '1', name: 'Admin', email: 'admin@test.com', role: 'Super Admin', permissions: [] };
        useAuthStore.getState().login(mockUser, 'test-token');

        const { user, isAuthenticated, token } = useAuthStore.getState();
        expect(user).toEqual(mockUser);
        expect(isAuthenticated).toBe(true);
        expect(token).toBe('test-token');
    });

    it('should logout and clear user', () => {
        const mockUser = { id: '1', name: 'Admin', email: 'admin@test.com', role: 'Super Admin', permissions: [] };
        useAuthStore.getState().login(mockUser, 'test-token');
        useAuthStore.getState().logout();

        const { user, isAuthenticated } = useAuthStore.getState();
        expect(user).toBeNull();
        expect(isAuthenticated).toBe(false);
    });
});

describe('Notifications Store', () => {
    it('should add notification and increment count', () => {
        const initialCount = useNotificationsStore.getState().unreadCount;
        useNotificationsStore.getState().addNotification({ title: 'Test', message: 'Test message', type: 'info' });

        const { unreadCount, notifications } = useNotificationsStore.getState();
        expect(unreadCount).toBe(initialCount + 1);
        expect(notifications[0].title).toBe('Test');
    });

    it('should mark notification as read', () => {
        useNotificationsStore.getState().addNotification({ title: 'Test', message: 'Test message', type: 'info' });
        const notificationId = useNotificationsStore.getState().notifications[0].id;

        useNotificationsStore.getState().markAsRead(notificationId);
        const notification = useNotificationsStore.getState().notifications.find(n => n.id === notificationId);
        expect(notification?.read).toBe(true);
    });
});
