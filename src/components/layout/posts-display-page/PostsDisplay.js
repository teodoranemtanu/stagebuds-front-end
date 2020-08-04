import React, {useContext, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PostList from "../../shared/posts/PostList";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {useHttpClient} from "../../../hooks/http-hook";
import {AuthContext} from "../../../contexts/AuthContext";
import Link from "@material-ui/core/Link";

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
    title: {
        textAlign: 'center'
    },
    paper: {
        padding: theme.spacing(3)
    }
}));

const PostsDisplay = () => {
    const noPostsText = "You don't have any posts yet. Want to create one now?";
    const theme = useTheme();
    const classes = useStyles(theme);
    const auth = useContext(AuthContext);

    const [noPostsMode, setNoPostsMode] = useState(false);

    const [postData, setPostData] = useState([]);
    const {sendRequest} = useHttpClient();

    useEffect(() => {
        const getPostData = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/posts/users/${auth.userId}`,
                    'GET', null,
                    {
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setPostData(response);
                if (response.length === 0) {
                    setNoPostsMode(true);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getPostData();
    }, [auth.token, auth.userId, postData.length, sendRequest]);

    const deletePost = async (postId) => {
        try {
            const response = await sendRequest(`http://localhost:5000/api/posts/${postId}`,
                'DELETE', null,
                {
                    "Authorization": 'Bearer: ' + auth.token
                });
            setPostData(postData.filter((post) => {
                return post.id !== postId
            }));
        } catch (e) {
            console.log(e);
        }
    };

    const editPost = async (values, postId) => {
        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/posts/${postId}`,
                'PUT',
                JSON.stringify({
                    concertDetails: {
                        title: values.title,
                        band: values.band,
                        date: values.date,
                        location: values.location
                    },
                    description: values.description,
                    timestamp: new Date(Date.now()).toJSON()
                }),
                {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer: ' + auth.token
                }
            );
            console.log(responseData);
            setPostData(postData.filter((post) => {
                return post.id !== postId
            }));
        } catch (e) { console.log(e)}
    };

    return (
        <Grid container spacing={3} className={classes.container}>
            {noPostsMode && <Grid item xl={12} sm={12} lg={12} md={12} className={classes.content}>
                <Paper className={classes.paper} component="div" elevation={1}>
                    <Typography variant="h6">
                        <Link href="/user/post" color="text">
                            {noPostsText}
                        </Link>
                    </Typography>
                </Paper>
            </Grid>}

            {noPostsMode === false &&
            <React.Fragment>
                <Grid item xl={10} sm={10} lg={10} md={10} className={classes.content}>

                </Grid>
                <Grid item xl={12} sm={12} lg={12} md={12} className={classes.content}>
                    <PostList posts={postData} editMode={true}
                              deletePost={deletePost} editPost={editPost}/>
                </Grid>
            </React.Fragment>}
        </Grid>
    );
};
export default PostsDisplay;