import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDisplayProfileData} from "../../../hooks/display-profile-data-hook";
import ProfileDisplay from "../../shared/ProfileDisplay";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PostList from "../../shared/posts/PostList";
import {useHttpClient} from "../../../hooks/http-hook";
import {AuthContext} from "../../../contexts/AuthContext";


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    content: {
        width: '100%'
    },
    title:{
        textAlign: 'center'
    },
    paper: {
        padding: theme.spacing(3)
    }
}));

const UserProfileDisplay = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const userId = useParams().uid;

    const {sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);

    const profileDisplayData = useDisplayProfileData(userId);
    const [postData, setPostData] = useState([]);

    const profileDisplay = () => {
        return <ProfileDisplay userInfo={profileDisplayData}/>
    };

    useEffect(() =>{
        const getPostData = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/posts/users/${userId}`,
                    'GET', null,
                    {
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setPostData(response);
            } catch (e) {
                console.log(e);
            }
        };
        getPostData();
    }, [auth.token, sendRequest, userId]);

    return (
        <Grid container spacing={3} className={classes.container}>
            <Grid item xl={10} sm={10} lg={10} md={10} className={classes.content}>
                <Paper className={classes.paper} component="div" elevation={1}>
                    {profileDisplay()}
                </Paper>
            </Grid>
            <Grid item xl={10} sm={10} lg={10} md={10} className={classes.content}>
                <Typography margin="normal" variant="h6" className={classes.title}>
                    {profileDisplayData.firstName} {profileDisplayData.lastName}'s past posts:
                </Typography>
            </Grid>
            <Grid item xl={10} sm={10} lg={10} md={10} className={classes.content}>
                <PostList posts={postData}/>
            </Grid>
        </Grid>
    );
};

export default UserProfileDisplay;
