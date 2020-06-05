import React from 'react';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import {useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

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

    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar aria-label="avatar" className={classes.avatar}>
                        {props.conversation.user1.profilePicture ? <img src={props.conversation.user1.profilePicture}
                                                                    alt={props.conversation.user1.firstName.charAt(0)}/>
                            : props.conversation.user1.firstName.charAt(0)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`${props.conversation.user1.firstName} ${props.conversation.user1.lastName}`}
                    // secondary={
                    //     <React.Fragment>
                    //         <Typography
                    //             component="span"
                    //             variant="body2"
                    //             className={classes.inline}
                    //             color="textPrimary"
                    //         >
                    //             Ali Connors
                    //         </Typography>
                    //         {" — I'll be in your neighborhood doing errands this…"}
                    //     </React.Fragment>
                    // }
                />
            </ListItem>
            <Divider variant = "inset" component = "li" />
        </React.Fragment>
    );
};

export default ConversationItem;