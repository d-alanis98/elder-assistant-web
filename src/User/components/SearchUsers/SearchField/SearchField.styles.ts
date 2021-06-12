import styled from 'styled-components';
//Components
import TextInput from '../../../../Shared/components/Layout/Input/TextInput/TextInput.styles';
import TouchableIcon from '../../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
//Theme
import ThemeUtils from '../../../../Shared/utils/Theme/ThemeUtils';
//Icons
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchFieldContainer = styled.div`${({ theme }) => `
    display: flex;
    padding: 0 0.5rem;
    height: 2.75rem;
    flex-direction: row;
    align-items: center;
    margin-top: 0.75rem;
    justify-content: center;
    border-radius: 0.5rem;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.05) };
    &:focus-within {
        border: 1px solid  ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.1) };
    }
    &:hover {
        box-shadow: 1px 1px 5px ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.25) };
        transition: all 300ms;
    }
`}`;

export const SearchFieldInput = styled(TextInput)
    .attrs(props => ({
        ...(props as Object),
        placeholder: 'Ingrese nombre de usuario'
    }))`
    height: 2.75rem;
    flex-grow: 1;
    margin: 0;
    background-color: transparent;
    &:focus,
    :active {
        outline: none;
        border: none;
    }
`;

export const SearchFieldIcon = styled(TouchableIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faSearch
    }))`
    font-size: 1rem;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #aaaaaa;
`;