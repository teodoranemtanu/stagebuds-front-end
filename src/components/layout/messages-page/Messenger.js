import React from 'react';
import MessageList from "./MessageList";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {fade, makeStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";
import ConversationList from "./ConversationList";
import {DUMMY_MESSAGES, DUMMY_CONVERSATIONS} from "./DummyData";
import SearchBar from "../../shared/SearchBar";
import TextField from "@material-ui/core/TextField";
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from "@material-ui/core/InputAdornment";
import io from 'socket.io-client';


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
    },
    list: {
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        },
        maxHeight: '30vw',
        width: '100%',
        overflow: 'auto'
    },
    messageTitle: {
        position: 'fixed'
    },
    search: {
        backgroundColor: fade(theme.palette.primary.main, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.25),
        },
        margin: theme.spacing(2)
    },
    messageInput: {
        width: '100%'
    }
}));

const Messenger = (props) => {
    const classes = useStyles(useTheme());

    return (
        <Grid container spacing={3} className={classes.container}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={classes.list}>
                <Typography variant="h6" className={classes.title}>
                    Past Conversations
                </Typography>
                <SearchBar placeholder="Search for users" classes={classes.search}/>
                <ConversationList conversations={DUMMY_CONVERSATIONS}/>
            </Grid>

            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                <Typography variant="h6" className={classes.title}>
                    Room title hardcoded for now
                </Typography>
                <div className={classes.list}>
                    <MessageList messages={DUMMY_MESSAGES}/>
                </div>
                <TextField className={classes.messageInput} margin="normal"
                           label="Type a message..." variant="outlined"
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <SendIcon/>
                                   </InputAdornment>
                               ),
                           }}
                />
            </Grid>
        </Grid>
    );
};

export default Messenger;