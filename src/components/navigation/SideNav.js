import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const buttons = [
    {
        title: 'Feed',
        link: '/'
    },
    {
        title: 'Gig Offer',
        link: '/'
    },
    {
        title: 'Future Concerts',
        link: '/'
    },
    {
        title: 'Your Concerts',
        link: '/'
    }
];

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

const SideNav = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {buttons.map(({title, link}) => (
                        <React.Fragment>
                            <ListItem button key={title} onClick={console.log(title)}>
                                {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                                <ListItemText primary={title} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </div>
        </Drawer>
    );
};

export default SideNav;