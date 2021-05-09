
import React from 'react';
//Components
import HeaderActions from './HeaderActions/HeaderActions';
//Styled components
import { HeaderContainer, HeaderLogo, HeaderTitle } from './Header.styles';

const Header: React.FC = () => (
    <HeaderContainer>
            <HeaderLogo 
                src = { require('../../../../assets/icon.png') }
            />
            <HeaderTitle>Elder</HeaderTitle>
            <HeaderActions />
    </HeaderContainer>
);

export default Header;
