import React, { useCallback } from 'react';
//Domain
import { UserPrimitives } from '../../../../../User/domain/User';
import { SubscriptionPrimitives } from '../../../../../Subscription/domain/Subscription';
//Components
import LoadingText from '../../../../../Shared/components/Loaders/LoadingText';
//Styled components
import { NotificationListItemLabel } from '../../NotificationsList.styles';
//Hooks
import useUsersSearch from '../../../../../Shared/store/hooks/users/useUsersSearch';

interface SubscriptionNotificationProps {
    content: SubscriptionPrimitives;
}

const SubscriptionNotification: React.FC<SubscriptionNotificationProps> = ({
    content
}) => {
    /**
     * Hooks
     */
    //Users search
    const { userId, getUserById } = useUsersSearch();
    //Local state
    const [userData, setUserData] = React.useState<UserPrimitives|undefined>();

    //Callbacks
    const isTargetUser = useCallback(() => ( 
        content.to === userId
    ), [ userId, content]);

    const getSubscriptionLabel = useCallback(() => (
        `${ isTargetUser()
            ? 'Solicitud recibida del usuario'
            : 'Solicitud enviada al usuario'
        } ${ userData?.name } ${ userData?.lastName }`
    ), [
        userData,
        isTargetUser
    ]);

    //Effects
    React.useEffect(() => {
        (async function() {
            //Function to determine if the current user is the target user
            //We initialize the userData
            let userData: UserPrimitives;
            //We request the user data
            if(isTargetUser())
                userData = await getUserById(content.from)
            else userData = await getUserById(content.to);
            //We set the data at state level
            setUserData(userData);
        })();
    }, [
        userId,
        content,
        getUserById,
        isTargetUser
    ]);

    //Render
    if(!userData)
        return <LoadingText 
            text = 'Obteniendo datos del usuario...'
        />

    return (
        <>
            <NotificationListItemLabel>
                { getSubscriptionLabel() }
            </NotificationListItemLabel>
        </>
    );
}

export default SubscriptionNotification;