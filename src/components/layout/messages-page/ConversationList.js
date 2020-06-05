import React from 'react';
import useTheme from "@material-ui/core/styles/useTheme";
import Grid from "@material-ui/core/Grid";
import MessageItem from "./MessageItem";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ConversationItem from "./ConversationItem";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        // backgroundColor: theme.palette.background.paper,
    },
    padding: {
        padding: theme.spacing(1)
    }
}));

const ConversationList = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <List className={classes.root}>
            {props.conversations.map((conversation) => (
                <Grid item>
                    <ConversationItem conversation={conversation}/>
                </Grid>
            ))}
        </List>
    );
};


export default ConversationList;