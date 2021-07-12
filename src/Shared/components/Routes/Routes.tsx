import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
//Components
import Login from '../../../UserAuthentication/components/Login/Login';
import Header from '../Header/Header';
import Register from '../../../UserAuthentication/components/Register/Register';
import NotFound from '../Miscelaneous/NotFound/NotFound';
import IsLoggedIn from '../Authentication/IsLoggedIn';
import ChatScreen from '../../../Chat/components/ChatScreen/ChatScreen';
import HomeScreen from '../../../User/components/HomeScreen/HomeScreen';
import SettingsScreen from '../../../User/components/SettingsScreen/SettingsScreen';
import ProtectedRoute from './ProtectedRoute';
import IoTDeviceScreen from '../../../IoTDevice/components/IoTDeviceScreen/IoTDeviceScreen';
import SearchUsersScreen from '../../../Subscription/components/SearchUsers/SearchUsersScreen';
import NotificationsScreen from '../../../Notifications/components/NotificationsScreen/NotificationsScreen';
//Hooks
import { useAppSelector } from '../../store/hooks';
import ConfigureDevice from '../../../IoTDevice/components/ConfigureDevice/ConfigureDevice';


const Routes: React.FC = () => {
    /**
     * Hooks
     */
    //Store selector
    const { loggedIn } = useAppSelector(state => state.user);

    //Render
    return (
        <Router>
            <Switch>
                <ProtectedRoute 
                    path = '/'
                    exact
                    loggedIn = { loggedIn }
                    component = { HomeScreen }
                />
                <ProtectedRoute 
                    path = '/chat'
                    exact
                    loggedIn = { loggedIn }
                    component = { ChatScreen }
                />
                <ProtectedRoute 
                    path = '/settings'
                    exact
                    loggedIn = { loggedIn }
                    component = { SettingsScreen }
                />
                <ProtectedRoute 
                    path = '/notifications'
                    exact
                    loggedIn = { loggedIn }
                    component = { NotificationsScreen }
                />
                <Route 
                    path = '/login'
                    component = { Login }
                />
                <Route 
                    path = '/register'
                    component = { Register }
                />
                <ProtectedRoute 
                    path = '/devices'
                    exact
                    loggedIn = { loggedIn }
                    component = { IoTDeviceScreen }
                />
                <ProtectedRoute 
                    path = '/devices/:deviceId'
                    exact
                    loggedIn = { loggedIn }
                    component = { ConfigureDevice }
                />
                <ProtectedRoute 
                    path = '/users'
                    exact
                    loggedIn = { loggedIn }
                    component = { SearchUsersScreen }
                />
                <Route 
                    path = '*'
                    component = {  NotFound }
                />
            </Switch>
            <IsLoggedIn>
                <Header />
            </IsLoggedIn>
        </Router>
    );
}

export default Routes;