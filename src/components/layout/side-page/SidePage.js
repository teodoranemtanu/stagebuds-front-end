import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import {useStyles} from './SidePageStyle';
import Auth from '../../auth/Auth';

import useTheme from "@material-ui/core/styles/useTheme";

const SidePage = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    console.log(theme);
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Auth/>
                </div>
            </Grid>
        </Grid>
    );
};

export default SidePage;