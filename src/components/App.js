import React, {useState} from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    useParams
} from "react-router-dom";

import SidePage from './layout/side-page/SidePage';
import {useAuth} from "../hooks/auth-hook";
import {AuthContext} from "../contexts/AuthContext";
import Dashboard from "./layout/dashboard/Dashboard";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./navigation/NavBar";
import SideNav from "./navigation/SideNav";
import {makeStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/styles";
import Profile from "./layout/profile/Profile";
import clsx from "clsx";
import CreatePost from "./layout/create-post/CreatePost";
import UserProfileDisplay from "./layout/profile/UserProfileDisplay";
import Typography from "@material-ui/core/Typography";
import PostList from "./shared/posts/PostList";
import PostsDisplay from "./layout/posts-display-page/PostsDisplay";

let drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(5,8),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -150,
        alignItems: "center"
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));


const App = (props) => {
    const {token, login, logout, userId} = useAuth();
    const theme = useTheme();
    const classes = useStyles(theme);
    let routes;

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (token) {
        routes = (
            <Grid container  style={{
                margin: 0,
                width: '100%',
                flexGrow: 1
            }} component="div" spacing={2} className={classes.root}>
                <CssBaseline/>
                <Grid item xs={12} lg={12} xl={12}>
                    <NavBar handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}  open={open}/>
                </Grid>
                <Grid item lg={3} xl={3}>
                    <SideNav handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose}  open={open} />
                </Grid>
                <Grid item xs={10} sm={10} lg={8} xl={8} component="main" className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
                    <div className={classes.drawerHeader} />
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
                            <CreatePost/>
                        </Route>

                        <Route path={`/profile/:uid`}>
                            <UserProfileDisplay/>
                        </Route>

                        <Route path="/post/myPosts" exact>
                            <PostsDisplay />
                        </Route>

                        <Route path="/messages" exact>
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
