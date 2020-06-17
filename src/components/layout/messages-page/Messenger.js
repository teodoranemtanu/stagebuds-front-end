import React, {useCallback, useContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import {Formik} from "formik";
import MessageList from "./MessageList";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {fade, makeStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";
import ConversationList from "./ConversationList";
import SearchBar from "../../shared/SearchBar";
import {AuthContext} from "../../../contexts/AuthContext";
import SendMessageInput from "./SendMessageInput";


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
        maxHeight: '25vw',
        width: '100%',
        overflow: 'auto',
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

const messagesSocket = io('http://localhost:5000/messenger');

const Messenger = (props) => {
    const classes = useStyles(useTheme());
    const auth = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);

    useEffect(() => {
        if (auth.token !== false && auth.token !== null) {
            messagesSocket.emit('getUserData', {token: auth.token, userId: auth.userId});

            messagesSocket.on('initialConversations', (conversations) => {
                setConversations(conversations);
                console.log(conversations);
            });
        }
    }, [auth.token, auth.userId]);

    const handleConversationClick = useCallback((conversation) => {
        messagesSocket.emit('conversationData', conversation);
        messagesSocket.on('getConversationData', (messages) => {
            setCurrentMessages(messages);
        });
        setCurrentConversation(conversation);
    }, []);

    const handleMessageSubmit = (values) => {
        let receiver, sender;
        if (currentConversation.user1._id === auth.userId) {
            receiver = currentConversation.user2._id;
            sender = currentConversation.user1._id;
        } else {
            receiver = currentConversation.user1._id;
            sender = currentConversation.user2._id;
        }

        const message = {
            text: values.message,
            sender: sender,
            receiver: receiver,
            timestamp: Date.now(),
            conversation: currentConversation._id
        };
        messagesSocket.emit('sendMessage', message);
        setCurrentMessages([...currentMessages, message]);
    };

    messagesSocket.on('newMessage', (message) => {
        if (currentConversation !== null)
            if (message.conversation === currentConversation._id) {
                setCurrentMessages([...currentMessages, message]);
            }
    });

    const getChatRoomTitle = (currentConversation) => {
        if (currentConversation.user1._id === auth.userId) {
            return `${currentConversation.user2.firstName} ${currentConversation.user2.lastName}`;
        } else {
            return `${currentConversation.user1.firstName} ${currentConversation.user1.lastName}`
        }
    };

    return (
        <Grid container spacing={3} className={classes.container}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} className={classes.list}>
                <Typography variant="h6" className={classes.title}>
                    Past Conversations
                </Typography>
                <SearchBar placeholder="Search for users" classes={classes.search}/>
                {conversations.length !== 0 && <ConversationList conversations={conversations}
                                                                 handleConversationClick={handleConversationClick}
                                                                 getTitle={getChatRoomTitle}
                />}

            </Grid>

            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                <Typography variant="h6" className={classes.title}>
                    {currentConversation && getChatRoomTitle(currentConversation)}
                </Typography>

                <div className={classes.list}>
                    <MessageList messages={currentMessages} conversation={currentConversation}/>
                </div>

                <Formik initialValues={{message: ''}}
                        onSubmit={values => handleMessageSubmit(values)}>
                    {props => <SendMessageInput {...props} classes={classes.messageInput}/>}
                </Formik>
            </Grid>
        </Grid>
    );
};

export default Messenger;