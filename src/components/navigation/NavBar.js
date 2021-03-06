import React, {useContext, useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {useTheme} from "@material-ui/core";
import clsx from "clsx";

import {AuthContext} from "../../contexts/AuthContext";
import {useStyles} from './NavBarStyle';
import NotificationList from "../shared/NotificationList";
import {useHttpClient} from "../../hooks/http-hook";
import SingleInputForm from "../layout/messages-page/SingleInputForm";
import {Formik} from "formik";
import Redirect from "react-router-dom/es/Redirect";

const NavBar = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const auth = useContext(AuthContext);
    const {sendRequest, isLoading} = useHttpClient();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [notificationCount, setNotificationCount] = useState(0);
    const [notificationAnchor, setNotificationAnchor] = useState(null);
    const [notificationDisplay, setNotificationDisplay] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleNotificationOpen = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleNotificationClose = async () => {
        setNotificationAnchor(null);
        setNotificationCount(0);

        const response = await sendRequest(`http://localhost:5000/api/notifications/`,
            'PUT', JSON.stringify(
                props.initialNotifications), {
                "Content-Type": 'application/json',
                "Authorization": 'Bearer: ' + auth.token
            });
    };

    const handleSearchSubmit = async (values) => {
        let response = null;
        response = await sendRequest(`http://localhost:5000/api/users/search/`,
            'POST', JSON.stringify({
                value: values.message
            }), {
                "Content-Type": 'application/json',
                "Authorization": 'Bearer: ' + auth.token
            });
        setSearchResults(response.searchResults);
        if(response){
            setRedirect(true);
        }
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const renderNotifications = (
        <Menu
            anchorEl={notificationAnchor}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={notificationAnchor}
            onClose={handleNotificationClose}
        >
            <NotificationList notifications={notificationDisplay}/>
        </Menu>
    );

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} component='a' href='/user/profile'>Profile</MenuItem>
            <MenuItem component="a" href='/' onClick={auth.logout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {/*<MenuItem>*/}
            {/*    <IconButton aria-label="show 4 new mails" color="inherit">*/}
            {/*        <Badge badgeContent={4} color="secondary">*/}
            {/*            <MailIcon/>*/}
            {/*        </Badge>*/}
            {/*    </IconButton>*/}
            {/*    <p>Messages</p>*/}
            {/*</MenuItem>*/}
            <MenuItem>
                <IconButton aria-label="show new notifications" color="inherit">
                    <Badge badgeContent={notificationCount} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    useEffect(() => {
        let count = 0;
        props.initialNotifications.forEach((notification) => {
            if (notification.read === false)
                count++;
        });
        setNotificationDisplay(props.initialNotifications);
        setNotificationCount(count);
    }, [props.initialNotifications]);

    useEffect(() => {
        if (props.notification.read === false) {
            setNotificationCount(notificationCount + 1);
        }
        notificationDisplay && setNotificationDisplay(
            [...notificationDisplay, props.notification]);
    }, [props.notification]);


    return (
        <React.Fragment>
            <div className={classes.grow}>
                <AppBar position="fixed" className={clsx(classes.appBar, {
                    [classes.appBarShift]: props.open,
                })}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={props.handleDrawerOpen}
                            className={clsx(classes.menuButton, props.open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            StageBuds
                        </Typography>
                        <Formik initialValues={{message: ''}}
                                onSubmit={(values, {resetForm}) => {
                                    handleSearchSubmit(values);
                                    resetForm();
                                }}>
                            {props => <SingleInputForm {...props} classes={classes.search}
                                                       placeholderText="Search for user"/>}
                        </Formik>
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            {/*<IconButton aria-label="show 4 new mails" color="inherit">*/}
                            {/*    <Badge badgeContent={4} color="secondary">*/}
                            {/*        <MailIcon/>*/}
                            {/*    </Badge>*/}
                            {/*</IconButton>*/}
                            <IconButton aria-label="show new notifications" color="inherit"
                                        onClick={handleNotificationOpen}>
                                <Badge badgeContent={notificationCount} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
                {renderNotifications}
            </div>
            {redirect && <Redirect to={{
                pathname: '/users/searchResults',
                state: {searchResults}
            }}/>}
        </React.Fragment>
    );
};

export default NavBar;