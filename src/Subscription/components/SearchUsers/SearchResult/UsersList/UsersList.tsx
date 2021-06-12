import React from 'react';
//Domain
import { UserPrimitives } from '../../../../../User/domain/User';
//Components
import EmptyData from '../../../../../Shared/components/Miscelaneous/EmptyData/EmptyData';
import UsersListItem from './UsersListItem';
import FirstRenderBanner from './FirstRenderBanner';
//Styled components
import { UsersListContainer } from './UsersList.styles';
//Hooks
import useSubscriptions from '../../../../../Shared/store/hooks/subscriptions/useSubscriptions';

interface UsersListProps {
    users: UserPrimitives[];
    isFirstRender?: boolean;
}

const UsersList: React.FC<UsersListProps> = ({
    users,
    isFirstRender
}) => { 
    /**
     * Hooks
     */
    //Subscriptions
    const { getRequestedSubscriptions } = useSubscriptions()
    //Effects
    React.useEffect(() => {
        getRequestedSubscriptions();
    }, [getRequestedSubscriptions]);

    return users.length === 0
    ? isFirstRender
        ? <FirstRenderBanner />
        : <EmptyData />
    : <UsersListContainer> 
        {
            users.map(user => (
                <UsersListItem 
                    key = { user._id }
                    user = { user }
                />
            )) 
        }
    </UsersListContainer>;
}

export default UsersList;