import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
//Components
import Avatar from '../../../../User/components/Layout/Avatar/Avatar';
import HeaderItem from './HeaderItem/HeaderItem';
//Styled components
import { HeaderActionsContainer } from './HeaderActions.styles';
//Icons
import { faBell, faCog, faComment, faHome, faMicrochip } from '@fortawesome/free-solid-svg-icons';

const HeaderActions: React.FC = () => {
    /**
     * Hooks
     */
    //History
    const history = useHistory();

    const redirectToScreen = useCallback((screen: string) => {
        history.push(screen);
    }, [history]);

    return (
        <HeaderActionsContainer>
            <HeaderItem
                section = ''
            >
                <Avatar 
                    size = { 40 }
                />
            </HeaderItem>
            <HeaderItem 
                icon = { faHome }
                section = 'Inicio'
                onClick = { () => redirectToScreen('/') }
            />
            <HeaderItem 
                icon = { faMicrochip }
                section = 'Dispositivos'
                onClick = { () => redirectToScreen('/devices') }
            />
            <HeaderItem 
                icon = { faComment }
                section = 'Chat'
                onClick = { () => redirectToScreen('/chat') }
            />
            <HeaderItem 
                icon = { faCog }
                section = 'Ajustes'
                onClick = { () => redirectToScreen('/settings') }
            />
            <HeaderItem 
                icon = { faBell }
                section = 'Notificaciones'
                onClick = { () => redirectToScreen('/notifications') }
            />
        </HeaderActionsContainer>
    );
}

export default HeaderActions;


