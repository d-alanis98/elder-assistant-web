/**
 * @author Damian Alanis Ramirez
 * @version 1.2.1
 * @description Notification entity primitive parameters.
 */
export interface NotificationPrimitives<T = any> {
    _id: string;
    type: string;
    content: T;
    issuedAt: string;
    recipients: string[];
}

export enum ValidNotificationTypes {
    SYSTEM = 'SYSTEM',
    PANIC_ALERT = 'PANIC_ALERT',
    SUBSCRIPTION = 'SUBSCRIPTION',
    IOT_DEVICE_EVENT ='IOT_DEVICE_EVENT'
} 