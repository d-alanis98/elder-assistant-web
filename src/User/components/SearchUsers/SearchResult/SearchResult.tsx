import React, { useEffect, useState } from 'react';
//Components
import UsersList from './UsersList/UsersList';
import LoadingText from '../../../../Shared/components/Loaders/LoadingText';
//Styled components
import { SearchResultContainer } from './SearchResult.styles';
//Hooks
import useUsersSearch from '../../../../Shared/store/hooks/users/useUsersSearch';

const SearchResult: React.FC = () => {
    /**
     * Hooks
     */
    //Users search
    const { users, fetching } = useUsersSearch();
    //Local state
    const [isFirstRender, setIsFirstRender] = useState(true);
    //Effects
    useEffect(() => {
        if(!fetching)
            return;
        setIsFirstRender(false);
    }, [fetching]);

    return (
        <SearchResultContainer>
            <UsersListRenderer 
                users = { users }
                fetching = { fetching }
                isFirstRender = { isFirstRender }
            />
        </SearchResultContainer>
    )
}

export default SearchResult;

//Internal components
interface UsersListRendererProps {
    users: any[];
    fetching: boolean;
    isFirstRender: boolean;
}
const UsersListRenderer: React.FC<UsersListRendererProps> = ({
    users, 
    fetching,
    isFirstRender
}) => fetching && isFirstRender
    ? <LoadingText text = 'Obteniendo usuarios...' />
    : <UsersList 
        users = { users }
        isFirstRender = { isFirstRender }
    />