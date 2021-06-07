import React, { useCallback, useContext } from 'react';
//Components
import IsLoggedIn from '../../Authentication/IsLoggedIn';
import NavigationItem from './NavigationItem';
import PrimaryUserProtected from '../../Screens/PrimaryUserProtected';
//Styled components
import { NavigationContainer } from './Navigation.styles';
//Icons
import { faCog, faComments, faHome, faMicrochip } from '@fortawesome/free-solid-svg-icons';


interface NavigationProps {
    navigation: any;
}

const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
    /**
     * Hooks
     */

    /**
     * Method to navigate to the selected section.
     * @param section Section (screen) name.
     */
    const handleNavigation = (section: string) => {
        navigation.navigate(section);
    }

    return (
        <IsLoggedIn>
            <NavigationContainer>
                <NavigationItem 
                    icon = { faHome } 
                    active = { false }
                    section = 'Home'
                    onClick = { handleNavigation }
                    sectionLabel = 'Inicio'
                    showSectionLabel
                />
                <PrimaryUserProtected>
                    <NavigationItem 
                        icon = { faMicrochip }
                        active = { false }
                        section = 'Devices'
                        onClick = { handleNavigation }
                        sectionLabel = 'Dispositivos'
                        showSectionLabel
                    />
                </PrimaryUserProtected>
                <NavigationItem 
                    icon = { faComments }
                    active = { false }
                    section = 'Chat'
                    onClick = { handleNavigation }
                    sectionLabel = 'Chat'
                    showSectionLabel
                />
                <NavigationItem 
                    icon = { faCog }
                    active = { false }
                    section = 'Settings'
                    onClick = { handleNavigation }
                    sectionLabel = 'Ajustes'
                    showSectionLabel
                />
            </NavigationContainer>
        </IsLoggedIn>
    )
}
        

export default Navigation;