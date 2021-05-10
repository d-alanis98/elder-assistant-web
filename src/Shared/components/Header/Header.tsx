
import React from 'react';
//Components
import HeaderActions from './HeaderActions/HeaderActions';
//Styled components
import { HeaderContainer, HeaderLogo, HeaderToggler } from './Header.styles';
import TouchableIcon from '../Layout/Icons/TouchableIcon/TouchableIcon';
//Icons
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => (
    <HeaderContainer>
            <HeaderTogglerButton />
            <HeaderLogo 
                src = '/assets/icon.png'
            />
            <HeaderActions />
    </HeaderContainer>
);

export default Header;

//Internal components
const HeaderTogglerButton: React.FC = () => (
    <HeaderToggler>
        <TouchableIcon 
            icon = { faArrowRight }
        />
    </HeaderToggler>
)
