/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Notification entity primitive parameters.
 */
export interface NotificationPrimitives<T = any> {
    _id: string;
    type: string;
    content: T;
    issuedAt: string;
    recipients: string[];
}