import React, { useCallback, useContext } from 'react';
//Components
import IsLoggedIn from '../../Authentication/IsLoggedIn';
import NavigationItem from './NavigationItem';
import PrimaryUserProtected from '../../Screens/PrimaryUserProtected';
//Styled components
import { NavigationContainer } from './Navigation.styles';
//Context
import CurrentScreenContext from '../../Screens/context/CurrentScreenContext';
//Icons
import { faCog, faComments, faHome, faMicrochip } from '@fortawesome/free-solid-svg-icons';


interface NavigationProps {
    navigation: any;
}

const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
    /**
     * Hooks
     */
    const { currentScreen } = useContext(CurrentScreenContext);

    /**
     * Method to navigate to the selected section.
     * @param section Section (screen) name.
     */
    const handleNavigation = (section: string) => {
        navigation.navigate(section);
    }
    /**
     * Method to determine if the tab is active.
     * @param {string} screenName The screen to which the tab indicator redirects.
     */
    const isActive = useCallback((screenName: string) => (
        screenName === currentScreen
    ), [currentScreen]);

    return (
        <IsLoggedIn>
            <NavigationContainer>
                <NavigationItem 
                    icon = { faHome } 
                    active = { isActive('Home') }
                    section = 'Home'
                    onClick = { handleNavigation }
                    sectionLabel = 'Inicio'
                    showSectionLabel
                />
                <PrimaryUserProtected>
                    <NavigationItem 
                        icon = { faMicrochip }
                        active = { isActive('Devices') }
                        section = 'Devices'
                        onClick = { handleNavigation }
                        sectionLabel = 'Dispositivos'
                        showSectionLabel
                    />
                </PrimaryUserProtected>
                <NavigationItem 
                    icon = { faComments }
                    active = { isActive('Chat') }
                    section = 'Chat'
                    onClick = { handleNavigation }
                    sectionLabel = 'Chat'
                    showSectionLabel
                />
                <NavigationItem 
                    icon = { faCog }
                    active = { isActive('Settings') }
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