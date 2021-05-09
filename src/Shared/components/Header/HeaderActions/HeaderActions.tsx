import { faBell } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback } from 'react';
//Components
import Avatar from '../../../../User/components/Layout/Avatar/Avatar';
import TouchableIcon from '../../Layout/Icons/TouchableIcon/TouchableIcon';
//Styled components
import { HeaderActionsContainer } from './HeaderActions.styles';

const HeaderActions: React.FC = () => {


    const redirectToScreen = useCallback((screen: string) => () => {
        console.log('redirecting')
    }, []);

    return (
        <HeaderActionsContainer>
            <TouchableIcon 
                icon = { faBell }
                size = '2x'
                onClick = { redirectToScreen('Notifications') }
                badgeText = '1'
            />
            <Avatar 
                size = { 50 }
                marginLeft = { 7 }
            />
        </HeaderActionsContainer>
    );
}

export default HeaderActions;


