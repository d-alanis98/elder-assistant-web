import React from 'react';
//Styled components
import { 
    SearchFieldInput, 
    SearchFieldContainer, 
    SearchFieldIcon
} from './SearchField.styles';
//Hooks
import useUsersSearch from '../../../../Shared/store/hooks/users/useUsersSearch';


const SearchField: React.FC = () => {
    /**
     * Hooks
     */
    //Users search
    const { getUsersByName } = useUsersSearch();

    //Render
    return (
        <SearchFieldContainer>
            <SearchFieldInput
                onChange = { ev => getUsersByName(ev.currentTarget.value) }
            />
            <SearchFieldIcon />
        </SearchFieldContainer>
    );
}

export default SearchField;