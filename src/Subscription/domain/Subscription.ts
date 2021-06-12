
export interface SubscriptionPrimitives {
    _id: string;
    to: string;
    from: string;
    status?: string;
    permissions?: SubscriptionPermissionsParameters;
}

export interface SubscriptionPermissionsParameters {
    readOwnerData: Boolean; 
    readChatMessages: Boolean;
    sendChatMessages: Boolean;
    receiveNotificationsOnOwnerEvents?: Boolean;
}

//Valid status values
export enum SubscriptionValidStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}
