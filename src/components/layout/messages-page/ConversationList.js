import React from 'react';
import useTheme from "@material-ui/core/styles/useTheme";
import Grid from "@material-ui/core/Grid";
import MessageItem from "./MessageItem";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ConversationItem from "./ConversationItem";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";

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
                    <ListItem onClick={() => props.handleConversationClick(conversation)} button>
                        <ConversationItem conversation={conversation} getTitle={props.getTitle}/>
                    </ListItem>
                </Grid>
            ))}
        </List>
    );
};


export default ConversationList;