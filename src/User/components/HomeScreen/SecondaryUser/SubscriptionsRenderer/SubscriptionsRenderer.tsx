import React, { useEffect } from 'react';
//Components
import LoadingText from '../../../../../Shared/components/Loaders/LoadingText';
import SubscriptionDataRenderer from './SubscriptionDataRenderer';
//Styled components
import { SubscriptionRendererTitle } from './SubscriptionRenderer.styles';
//Hooks
import useSubscriptions from '../../../../../Shared/store/hooks/subscriptions/useSubscriptions';

const SubscriptionRenderer: React.FC = () => {
    /**
     * Hooks
     */
    //Subscriptions
    const { 
        fetching,
        acceptedSubscriptions,
        getRequestedSubscriptions 
    } = useSubscriptions();
    //Effects
    useEffect(() => {
        getRequestedSubscriptions();
    }, [getRequestedSubscriptions]);

    //Render
    if(fetching)
        return <LoadingText 
            text = 'Obteniendo datos...'
        />
    return <>
        <SubscriptionRendererTitle>
            Actividad de usuarios
        </SubscriptionRendererTitle>
        { 
            acceptedSubscriptions.map(subscription => (
                <SubscriptionDataRenderer 
                    key = { subscription._id }
                    subscription = { subscription }
                />
            ))
        }
    </>
}

export default SubscriptionRenderer;