import React, {useContext, useEffect, useState} from 'react';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import {useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import {AuthContext} from "../../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
    avatar: {
        backgroundColor: red[500],
        // margin: theme.spacing(1),
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}));


const ConversationItem = (props) => {
    const classes = useStyles(useTheme());
    const auth = useContext(AuthContext);

    const [conversationUser, setConversationUser] = useState({});

    useEffect(() => {
        console.log(props.conversation.user1._id, auth.userId);
        if (props.conversation.user1._id === auth.userId) {
            setConversationUser(props.conversation.user2);
            console.log(conversationUser, 'user2');
        } else {
            setConversationUser(props.conversation.user1);
            console.log(conversationUser, 'user1');
        }
        console.log(conversationUser);
    }, [auth.userId, conversationUser, props.conversation.user1, props.conversation.user2]);


    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    { conversationUser.firstName !== undefined &&
                    <Avatar aria-label="avatar" className={classes.avatar}>
                        {conversationUser.profilePicture ? <img src={conversationUser.profilePicture}
                                                 alt={conversationUser.firstName.charAt(0)}/>
                            : conversationUser.firstName.charAt(0)}
                    </Avatar>}
                </ListItemAvatar>
                < ListItemText
                    primary={props.getTitle(props.conversation)}
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </React.Fragment>
    );
};

export default ConversationItem;