import React, {useContext} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {AuthContext} from "../../contexts/AuthContext";
import AppBar from "@material-ui/core/AppBar";
import {useTheme, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 100,
    },
    title: {
        flexGrow: 1
    }
}));

const NavBar = (props) => {
    const auth = useContext(AuthContext);
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap className={classes.title}>
                    Stage Buds
                </Typography>
                <Button onClick={auth.logout}> LOGOUT </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;