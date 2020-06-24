import React from 'react';
import Grid from "@material-ui/core/Grid";
import PostItem from "./PostItem";

const PostList = (props) => {
    const checkPostSaved = (postId) => {
        return props.savedPosts !== undefined && props.savedPosts.includes(postId);
    };

    return (
        <Grid container spacing={3}>
            {props.posts.map((post) => (
                <Grid item xl={12} sm={12} lg={12} md={12}>
                    <PostItem postDetails={post} key={post.id}
                              saved={checkPostSaved(post.id)}
                              editMode={props.editMode}
                              deletePost={props.deletePost}
                              editPost={props.editPost}
                              notificationSocket={props.notificationSocket}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default PostList;