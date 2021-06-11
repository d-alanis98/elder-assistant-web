import React from 'react';
//Styles components
import { 
    SettingCard,
    SettingTitle,
    SettingContainer, 
    SettingModifierContainer,
    SettingLabelWithIcon,  
} from '../Settings.styles';
//Icons
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../../../Shared/store/hooks';
import { logoutAction } from '../../../../../Shared/store/reducers/userDuck';

const AccountSettings: React.FC = () => {

    return (
        <SettingContainer>
            <SettingTitle
                icon = { faUserCircle }
            >
                Cuenta
            </SettingTitle>
            <SettingModifierContainer>
                <Logout />
            </SettingModifierContainer>
        </SettingContainer>
    )
}

export default AccountSettings;

//Internal components
const Logout: React.FC = () => {
    /**
     * Hooks
     */
    //Action dispatcher
    const dispatch = useAppDispatch();
    //Callbacks
    const logout = React.useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);

    return (
        <SettingCard
            onClick = { logout }
        >
            <SettingLabelWithIcon 
                icon = { faSignOutAlt }
                text = 'Cerrar sesión'
            />
        </SettingCard>
    )
}