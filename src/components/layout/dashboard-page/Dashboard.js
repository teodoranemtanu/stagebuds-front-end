import React, {useContext, useEffect, useState} from 'react';
import PostList from "../../shared/posts/PostList";
import {AuthContext} from "../../../contexts/AuthContext";
import {useHttpClient} from "../../../hooks/http-hook";

const Dashboard = (props) => {
    const auth = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState(null);
    const {sendRequest} = useHttpClient();

    useEffect(() => {
        const getUserPosts = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/posts/`,
                    'GET', null,
                    {
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setPosts(response);
            } catch (err) {
                console.log(err);
            }
        };
        const getSavedPosts = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/users/user/saved`,
                    'GET', null, {
                    "Authorization": 'Bearer: ' + auth.token
                });
                setSavedPosts(response.savedPosts);
                console.log(response)
            } catch (err) {
                console.log(err);
            }
        };
        getUserPosts();
        getSavedPosts();
    }, [auth.token, sendRequest]);

    return (
        <React.Fragment>
            {savedPosts && <PostList notificationSocket={props.notificationSocket} posts={posts} savedPosts={savedPosts}/>}
        </React.Fragment>
    );
};

export default Dashboard;