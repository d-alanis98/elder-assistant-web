import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
//Components
import Login from '../../../UserAuthentication/components/Login/Login';
import NotFound from '../Miscelaneous/NotFound/NotFound';
import ChatScreen from '../../../Chat/components/ChatScreen/ChatScreen';
import HomeScreen from '../../../User/components/HomeScreen/HomeScreen';
import SettingsScreen from '../../../User/components/SettingsScreen/SettingsScreen';
import ProtectedRoute from './ProtectedRoute';
//Hooks
import { useAppSelector } from '../../store/hooks';


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
                <Route 
                    path = '/login'
                    component = { Login }
                />
                <Route 
                    path = '*'
                    component = {  NotFound }
                />
            </Switch>
        </Router>
    );
}

export default Routes;