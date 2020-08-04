import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import {useStyles} from './SidePageStyle';
import Auth from '../../auth/Auth';

import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";

const SidePage = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" paragraph variant="h4" className={classes.title}>
                        StageBuds
                    </Typography>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <br/>
                    <Auth/>
                </div>
            </Grid>
        </Grid>
    );
};

export default SidePage;