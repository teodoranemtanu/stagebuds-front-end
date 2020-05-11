import React, {useEffect, useState} from 'react';
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {Buttons} from "./SideNavButtons";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    drawer: {
        // width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        // width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

const SideNav = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Paper elevation={3}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>
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
                </div>
            </Drawer>
        </Paper>
    );
};

export default SideNav;