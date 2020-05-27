import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Buttons} from "./SideNavButtons";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon  from '@material-ui/icons/Close';

let drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // drawerContainer: {
    //     overflow: 'auto',
    // },
}));

const SideNav = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const open = props.open;

    return (
         <Paper elevation={3}>
             <Drawer
                 className={classes.drawer}
                 variant="persistent"
                 anchor="left"
                 open={open}
                 classes={{
                     paper: classes.drawerPaper,
                 }}
            >
                 <div className={classes.drawerHeader}>
                     <IconButton onClick={props.handleDrawerClose}>
                         <ChevronLeftIcon />
                     </IconButton>
                 </div>
                 <Divider />
                {/*<div className={classes.drawerContainer}>*/}
                    <List>
                        {Buttons.map(({label, link, action}) => (
                            <React.Fragment>
                                <ListItem button key={action} value={action} >
                                    <Link href={link} color="inherit">
                                        <ListItemText>{label}</ListItemText>
                                    </Link>
                                </ListItem>
                                <Divider/>
                            </React.Fragment>
                        ))}
                    </List>
                {/*</div>*/}
            </Drawer>
        </Paper>
    );
};

export default SideNav;