import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import {getSidePageStyle} from './SidePageStyle';
import Auth from './Auth';
import {withStyles} from "@material-ui/core";

const styles = theme => getSidePageStyle(theme);

class SidePage extends React.Component{
    render() {
        return (
            <Grid container component="main" className={this.props.classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={this.props.classes.image}/>

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={this.props.classes.paper}>
                        <Avatar className={this.props.classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Auth />
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SidePage);