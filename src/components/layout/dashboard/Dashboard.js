import React, {useContext} from 'react';
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import SideNav from "../../navigation/SideNav";

import {makeStyles, useTheme} from '@material-ui/core/styles';
import {AuthContext} from "../../../contexts/AuthContext";

import Button from "@material-ui/core/Button";
import NavBar from "../../navigation/NavBar";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(5, 8),
    }
}));
let text;

const Dashboard = (props) => {
    const auth = useContext(AuthContext);

    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <NavBar/>
            <SideNav/>
            <main className={classes.content}>
                <Toolbar/>
                <Typography paragraph>
                    {text}
                </Typography>
                <Typography paragraph>
                    {text}
                </Typography>
            </main>
        </div>
    );
};

export default Dashboard;