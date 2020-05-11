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
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./navigation/NavBar";
import SideNav from "./navigation/SideNav";
import PostList from "./timeline/PostList";
import {makeStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/styles";
import Profile from "./layout/profile/Profile";

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        flexGrow: 1
    },
    content: {
        padding: theme.spacing(5, 8),
    }
}));


const App = (props) => {
    const {token, login, logout, userId} = useAuth();
    const theme = useTheme();
    const classes = useStyles(theme);
    let routes;

    if (token) {
        routes = (
            <Grid container  style={{
                margin: 0,
                width: '100%',
                flexGrow: 1
            }} component="div" spacing={2} className={classes.root}>
                <CssBaseline/>
                <Grid item xs={12} lg={12} xl={12}>
                    <NavBar/>
                </Grid>
                <Grid item xs={false} sm={false} lg={3} xl={3}>
                    <SideNav/>
                </Grid>
                <Grid item xs={10} sm={10} lg={7} xl={8} component="main" className={classes.content}>
                    <Switch>
                        <Route path="/" exact>
                            <Dashboard/>
                        </Route>

                        <Route path="/user/edit" exact>
                            <div>edit user</div>
                        </Route>

                        <Route path="/user/profile" exact>
                            <Profile/>
                        </Route>

                        <Route path="/user/post" exact>
                            <div>profile user </div>
                        </Route>

                        <Route path="/user/concerts" exact>
                            <div>profile user </div>
                        </Route>

                        <Redirect to="/"/>
                    </Switch>
                </Grid>
            </Grid>
        );
    } else {
        routes = (<Switch><Route path="/" exact> <SidePage/> </Route> </Switch>);
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
                {routes}
            </Router>
        </AuthContext.Provider>
    )
};

export default App;
