import React, {useContext, useEffect, useState} from 'react';
import PostList from "../../shared/posts/PostList";
import {AuthContext} from "../../../contexts/AuthContext";
import {useHttpClient} from "../../../hooks/http-hook";

const Dashboard = (props) => {
    const auth = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
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
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };
        getUserPosts();
    }, [auth.token, sendRequest]);

    return (
        <PostList posts={posts}/>
    );
};

export default Dashboard;