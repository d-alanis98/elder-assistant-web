import React, { useEffect, useState } from 'react';
//Domain
import { IoTDevicePrimitives } from '../../../../../IoTDevice/domain/IoTDevice';
import { SubscriptionPrimitives } from '../../../../../Subscription/domain/Subscription';
//Components
import { FlexRow } from '../../../../../Shared/components/Layout/Containers/Flexbox.styles';
import LoadingText from '../../../../../Shared/components/Loaders/LoadingText';
import { UserDataColumn } from '../../../../../Subscription/components/SearchUsers/SearchResult/UsersList/UsersListItem';
import DeviceDataRenderer from '../../../../../IoTDeviceData/components/DeviceDataRenderer/DeviceDataRenderer';
import { ExternalUserAvatar } from '../../../Layout/Avatar/Avatar';
//Styled components
import { SubscriptionRendererUser } from './SubscriptionRenderer.styles';
//Hooks
import useDevices from '../../../../../Shared/store/hooks/devices/useDevices';
import useUsersSearch from '../../../../../Shared/store/hooks/users/useUsersSearch';

interface SubscriptionDataProps {
    subscription: SubscriptionPrimitives;
}

const SubscriptionDataRenderer: React.FC<SubscriptionDataProps> = ({
    subscription
}) => {
    /**
     * Hooks
     */
    //Devices
    const { 
        fetching,
        devicesByUser,
        getUserDevices 
    } = useDevices();
    //Local state
    const [devices, setDevices] = useState<IoTDevicePrimitives[]>([]);
    //Effects
    useEffect(() => {
        const userDevices = devicesByUser?.[subscription.to];
        if(!userDevices)
            getUserDevices(subscription.to);
        else setDevices(userDevices)
    }, [
        subscription,
        devicesByUser,
        getUserDevices
    ]);

    if(fetching)
        return <LoadingText 
            text = 'Obteniendo dispositivos...'
        />

    return (
        <SubscriptionRendererUser 
            toggler = {
                <SubscriptionToggler subscription = { subscription } />
            }
        >
            <DeviceDataRenderer 
                devices = { devices }
            />
        </SubscriptionRendererUser>
    )
}

export default SubscriptionDataRenderer;

//Internal components
const SubscriptionToggler: React.FC<SubscriptionDataProps> = ({
    subscription
}) => {
    /**
     * Hooks
     */
    //Users search
    const { usersDictionary } = useUsersSearch();
    //Constants
    const userData = usersDictionary?.[subscription.to];

    //Render
    if(!userData)
        return null;
    return (
        <FlexRow
            flexGrow = { 1 }
            alignItems = 'center'
        >
            <ExternalUserAvatar 
                size = { 40 }
                user = { userData }
            />
            <UserDataColumn 
                user = { userData }
            />
        </FlexRow>
    )
}