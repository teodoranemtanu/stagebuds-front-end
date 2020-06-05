import React from 'react';
import Grid from "@material-ui/core/Grid";
import MessageItem from "./MessageItem";
import {makeStyles} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";

/// list of messages send via props
///
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width:'98%'
        // marginTop: 0
    },
    padding: {
        padding: theme.spacing(1)
    }
}));

const MessageList = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid container spacing={2} className={classes.root}>
            {props.messages.map((message) => (
                <Grid item>
                    <MessageItem message={message}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default MessageList;