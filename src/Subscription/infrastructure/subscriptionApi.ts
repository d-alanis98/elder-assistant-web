//Domain
import { SubscriptionPrimitives, SubscriptionValidStatus } from '../domain/Subscription';
//Requests manager
import AxiosRequest from '../../Shared/infrastructure/Requests/AxiosRequest';

/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
 * @description Subscriptions entity API facade.
 */

export const getRequestedSubscriptions = async (): Promise<SubscriptionPrimitives[]> => {
    const response = await AxiosRequest.get('/user/requested-subscriptions');
    return response.data;
} 

export const getReceivedSubscriptions = async (): Promise<SubscriptionPrimitives[]> => {
    const response = await AxiosRequest.get('user/subscription-requests');
    return response.data;
}

export const requestSubscription = async (primaryUserId: string): Promise<SubscriptionPrimitives> => {
    const response = await AxiosRequest.post(
        `/user/${ primaryUserId }/subscribe`,
        { }
    );
    return response.data;
}

export interface AcceptOrRejectSubscription {
    status: SubscriptionValidStatus;
    subscriptionId: string;
}

export const acceptOrRejectSubscription = async ({
    status,
    subscriptionId
}: AcceptOrRejectSubscription): Promise<SubscriptionPrimitives> => {
    const response = await AxiosRequest.put(
        `/user/subscription/${ subscriptionId }`,
        { status }
    );
    return response.data;
}