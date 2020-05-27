import React, {useContext} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {AuthContext} from "../../contexts/AuthContext";
import AppBar from "@material-ui/core/AppBar";
import {useTheme, makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";

let drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    }
}));

const NavBar = (props) => {
    const auth = useContext(AuthContext);
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <AppBar position="fixed" className={clsx(classes.appBar, {
            [classes.appBarShift]: props.open,
        })}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, props.open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>
                    Stage Buds
                </Typography>
                <Button onClick={auth.logout}> LOGOUT </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;