import React from 'react';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

const NotificationList = (props) => {
    return (
        <List dense>
            {props.notifications.map((notification) => (
                <ListItem>
                    <ListItemText>
                        {!notification.read &&
                        <Typography variant="subtitle2" color="textPrimary" component="p">
                            {notification.text}
                        </Typography>}
                        {notification.read &&
                        <Typography variant="body2" color="textPrimary" component="p">
                            {notification.text}
                        </Typography>}
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    );
};

export default NotificationList;