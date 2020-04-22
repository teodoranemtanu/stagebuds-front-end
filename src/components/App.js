import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

import SidePage from './layout/side-page/SidePage';
import {useAuth} from "../hooks/auth-hook";
import {AuthContext} from "../contexts/AuthContext";
import Dashboard from "./layout/dashboard/Dashboard";

const App = (props) => {
    const {token, login, logout, userId} = useAuth();

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Dashboard/>
                </Route>

                <Route path="/user/edit" exact>

                </Route>
                <Route path="/user/profile" exact>

                </Route>

                <Redirect to="/"/>
            </Switch>
        );
    } else {
        routes = <Route path="/" exact> <SidePage/> </Route>
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout
            }}
        >
            <Router>
                {/*<MainNavigation / >*/}
                <main>
                    {routes}
                </main>
            </Router>
        </AuthContext.Provider>
    )
};

export default App;
