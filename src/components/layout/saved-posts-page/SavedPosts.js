import React, {useContext, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {useHttpClient} from "../../../hooks/http-hook";
import {AuthContext} from "../../../contexts/AuthContext";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import MapContainer from "./MapContainer";
import {usePosition} from "use-position";


const useStyles = makeStyles((theme) => ({
    listTitle: {
        marginTop: theme.spacing(3),
    },
    center: {
        display: 'flex',
        justifyContent: 'center'
    },
    listItem: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    list: {
        backgroundColor: theme.palette.background.paper,
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
        height: '30vw',
        overflow: 'auto',
        padding: theme.spacing(2)
    },
    inline: {
        display: 'inline',
    },
}));

const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

const SavedPosts = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const auth = useContext(AuthContext);
    const [savedPosts, setSavedPosts] = useState(null);
    const [selectedItemCoordinates, setSelectedItemCoordinates] = useState(null);
    const {sendRequest} = useHttpClient();
    const watch = true;
    const {latitude, longitude} = usePosition(watch);


    useEffect(() => {
        const getSavedPosts = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/users/user/saved/full`,
                    'GET', null, {
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setSavedPosts(response.savedPosts);
                console.log(response.savedPosts);
            } catch (err) {
                console.log(err);
            }
        };
        getSavedPosts();
    }, [auth.token, sendRequest]);

    const getDisplayDate = (date) => {
        const concertDate = new Date(date);
        return concertDate.toLocaleDateString(undefined, options);
    };


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} lg={7} xl={7} className={classes.image}>
                {latitude!==undefined && savedPosts &&
                <MapContainer latitude={latitude} longitude={longitude} savedPosts={savedPosts}/>}
            </Grid>

            <Grid item xs={12} sm={8} md={5} lg={5} xl={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <div className={classes.center}>
                        <Typography variant="h6" className={classes.listTitle}> Saved Concerts </Typography>
                    </div>
                    <List className={classes.list}>
                        {savedPosts && savedPosts.map((post) => {
                            return (
                                <React.Fragment>
                                    <ListItem className={classes.listItem} button onClick={() => {
                                        setSelectedItemCoordinates(post.concertDetails.coordinates);
                                        console.log(post.concertDetails.coordinates)
                                    }}>
                                        <ListItemAvatar>
                                            <Avatar aria-label="avatar" className={classes.avatar}>
                                                {post.author.profilePicture ? <img src={post.author.profilePicture}
                                                                                   alt={post.author.firstName.charAt(0)}/>
                                                    : post.author.firstName.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={post.concertDetails.title}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        Date:
                                                    </Typography>
                                                    {getDisplayDate(post.concertDetails.date)}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider className={classes.listItem} component="li"/>
                                </React.Fragment>
                            )
                        })}
                    </List>
                </div>
            </Grid>
        </Grid>
    );
};
export default SavedPosts;