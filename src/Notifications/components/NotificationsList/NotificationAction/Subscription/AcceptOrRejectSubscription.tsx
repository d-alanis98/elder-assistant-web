import React, { useCallback, useMemo } from 'react';
//Domain
import { SubscriptionPrimitives, SubscriptionValidStatus } from '../../../../../Subscription/domain/Subscription';
//Components
import PrimaryUserProtected from '../../../../../Shared/components/Screens/PrimaryUserProtected';
import ConditionalRendering from '../../../../../Shared/components/Layout/Containers/ConditionalRendering';
//Styled components
import { AcceptSubscriptionButton, RejectSubscriptionButton } from './AcceptOrRejectSubscription.styles';
//Hooks
import useSubscriptions from '../../../../../Shared/store/hooks/subscriptions/useSubscriptions';

interface SubscriptionProps {
    content: SubscriptionPrimitives;
}

const AcceptOrRejectSubscription: React.FC<SubscriptionProps> = ({
    content: subscription
}) => {
    /**
     * Hooks
     */
    //Subscriptions
    const { 
        subscriptions, 
        acceptOrRejectSubscription 
    } = useSubscriptions();
    //Callbacks
    const isPending = useCallback(() => (
        subscriptions[subscription.from]?.status === SubscriptionValidStatus.PENDING
    ), [
        subscription,
        subscriptions
    ]);

    const updateSubscription = useCallback((status: SubscriptionValidStatus) => {
        acceptOrRejectSubscription({
            status,
            subscriptionId: subscription._id
        })
    }, [
        subscription,
        acceptOrRejectSubscription
    ]);

    return useMemo(() => (
        <ConditionalRendering
            condition = { isPending() }
        >
            <PrimaryUserProtected>
                
                <AcceptSubscriptionButton 
                    onClick = { () => updateSubscription(SubscriptionValidStatus.ACCEPTED) }
                />
                <RejectSubscriptionButton 
                    onClick = { () => updateSubscription(SubscriptionValidStatus.REJECTED) }
                />
            </PrimaryUserProtected>
        </ConditionalRendering>
    ), [
        isPending,
        updateSubscription
    ]);
}

export default AcceptOrRejectSubscription;