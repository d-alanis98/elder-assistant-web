import React from 'react';
//Components
import SearchField from './SearchField/SearchField';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
import SecondaryUserProtected from '../../../Shared/components/Screens/SecondaryUserProtected';
import SearchResult from './SearchResult/SearchResult';


const SearchUsersScreen: React.FC = () => (
    <SecondaryUserProtected
        showFallback
    >
        <ScreenContainer
            section = 'Búsqueda de usuarios'
        >
            <SearchField />
            <SearchResult />
        </ScreenContainer>
    </SecondaryUserProtected>

);

export default SearchUsersScreen;