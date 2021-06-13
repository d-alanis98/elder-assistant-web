import React, { useCallback } from 'react';
//Domain
import { UserPrimitives } from '../../../../../User/domain/User';
import { SubscriptionPrimitives, SubscriptionValidStatus } from '../../../../domain/Subscription';
//Components
import LoadingText from '../../../../../Shared/components/Loaders/LoadingText';
import { ExternalUserAvatar } from '../../../../../User/components/Layout/Avatar/Avatar';
//Styled component
import { 
    UserListItemRow, 
    UserListItemLabel,
    UserListitemColumn,
    UserListItemSubText,
    UsersListItemContainer, 
    PendingSubscriptionIcon,
    AcceptedSubscriptionIcon,
    UsersListItemSubscriptionButton
} from './UsersList.styles';
//Hooks
import useSubscriptions from '../../../../../Shared/store/hooks/subscriptions/useSubscriptions';

interface UsersListItemProps {
    user: UserPrimitives;
}

const UsersListItem: React.FC<UsersListItemProps> = ({
    user
}) => (
    <UsersListItemContainer>
        <UserListItemRow>
            <ExternalUserAvatar 
                size = { 40 }
                user = { user }
            />
            <UserDataColumn 
                user = { user }
            />
            <SubscriptionRequestColumn 
                user = { user }
            />
        </UserListItemRow>
    </UsersListItemContainer>
);

export default UsersListItem;

//Internal components

/**
 * UserData
 */
export const UserDataColumn: React.FC<UsersListItemProps> = ({
    user
}) => ( 
    <UserListitemColumn>
        <UserNameLabel 
            user = { user }
        />
        <UserEmailSubText 
            user = { user }
        />
    </UserListitemColumn>
);

const UserNameLabel: React.FC<UsersListItemProps> = ({
    user
}) => (
    <UserListItemLabel>
        { user.name } { user.lastName }
    </UserListItemLabel>
);

const UserEmailSubText: React.FC<UsersListItemProps> = ({
    user
}) => (
    <UserListItemSubText>
        { user.email }
    </UserListItemSubText>
);

/**
 * SubscriptionRequest
 */
const SubscriptionRequestColumn: React.FC<UsersListItemProps> = ({
    user
}) => {
    /**
     * Hooks
     */
    //Subscriptions
    const { 
        fetching,
        subscriptions, 
        requestSubscription 
    } = useSubscriptions();
    //Callbacks
    const isAlreadyRequested = useCallback(() => (
        subscriptions[user._id] !== undefined && 
        subscriptions[user._id]?.status !== SubscriptionValidStatus.REJECTED
    ), [
        user,
        subscriptions
    ]); 

    //Render
    if(fetching)
        return <LoadingText 
            text = 'Cargando...'
        />

    return (
        <UserListitemColumn
            marginLeft = 'auto'
            marginRight = '0'
        >
            {
                !isAlreadyRequested() 
                    ? <UsersListItemSubscriptionButton 
                        onClick = { () => requestSubscription(user._id) }
                    />
                    : <SubscriptionRequestStatus 
                        subscription = { subscriptions[user._id] }
                    />
            }
        </UserListitemColumn>
    );
}

interface SubscriptionRequestStatusProps {
    subscription: SubscriptionPrimitives;
}

const SubscriptionRequestStatus: React.FC<SubscriptionRequestStatusProps> = ({
    subscription
}) => subscription.status === SubscriptionValidStatus.PENDING
    ? <PendingSubscriptionIcon />
    : <AcceptedSubscriptionIcon />