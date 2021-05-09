import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface ProtectedRouteProps {
    path: string;
    exact?: boolean;
    loggedIn: boolean;
    component?: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    path,
    exact,
    children,
    loggedIn,
    component,
    ...restProps
}) => loggedIn
    ? children
        ? (
            <Route
                path = { path }
                exact = { exact }
                { ...restProps }
            >
                { children }
            </Route>
        )
        : <Route 
            path = { path }
            exact = { exact }
            component = { component }
            { ...restProps }
        />
    : <Redirect to='/login'/>;

export default ProtectedRoute;