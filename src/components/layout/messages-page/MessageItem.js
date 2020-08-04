import React, {useContext} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import red from "@material-ui/core/colors/red";
import {AuthContext} from "../../../contexts/AuthContext";
import clsx from "clsx";

/// text, timestamp, sender {firstName, lastName, profilePic, id}, messageMode (sender === auth.UserId) => true, else false => pt UI
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    padding: {
        padding: theme.spacing(0)
    },
    avatar: {
        backgroundColor: red[500],
        // margin: theme.spacing(1),
        width: theme.spacing(3),
        height: theme.spacing(3)
    },
    date: {
        marginLeft: 'auto',
        padding: 0,
        margin: -1
    },
    content: {
        padding: theme.spacing(0, 5),
    },
    currentUser: {
        background: theme.palette.primary.light,
    },
    otherUser: {
        backgroundColor: theme.palette.secondary.light,
        // color: theme.palette.primary.contrastText
    }
}));

const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

const MessageItem = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const auth = useContext(AuthContext);
    const timestamp = new Date(props.message.timestamp);

    const isOwnerOfMessage = () => {
        return auth.userId === props.message.sender;
    };

    return (
        <React.Fragment>
            <Typography variant="overline" color="textSecondary" className={classes.date}>
                {timestamp.toLocaleDateString(undefined, options)}
            </Typography>

            <Card className={clsx(classes.root, {
                [classes.currentUser]: isOwnerOfMessage(),
                [classes.otherUser]: !isOwnerOfMessage()
            })}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="avatar" className={classes.avatar}>
                            {props.sender.profilePicture ? <img src={props.sender.profilePicture}
                                                                        alt={props.sender.firstName.charAt(0)}/>
                                : props.sender.firstName.charAt(0)}
                        </Avatar>
                    }
                    title={
                        <Typography variant="subtitle2" gutterBottom>
                            {props.sender.firstName} {props.sender.lastName}
                        </Typography>
                    }
                    className={classes.padding}/>

                <Typography variant="body2" component="p" className={classes.content}>
                    {props.message.text}
                </Typography>

            </Card>
        </React.Fragment>
    );
};

export default MessageItem;