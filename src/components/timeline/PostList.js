import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import PostItem from "./PostItem";

const postsDetails = [
    {
        id: 1,
        concertDetails: {
            title: 'Metallica 30 years live tour',
            band: 'Metallica',
            date: new Date().toDateString(),
            location: 'Bucharest, RO'
        },
        author: 'Jane Doe',
        createdAt: new Date().toDateString(),
        description: 'This is a concert I would like to attend as Metallica is one of my fave bands',
        text: 'If the aria-label is one tool used by assistive technologies (like screen readers),\n' +
            '                    it is not natively supported on browsers and has no effect on them.\n' +
            '                    It won\'t be of any help to most of the people targetted by the WCAG (except screen reader users),\n' +
            '                    for instance a person with intellectal disabilities.'
    },
    {
        id: 2,
        concertDetails: {
            title: 'Pink Floyd tribute concert',
            band: 'Speak Floyd',
            date: new Date().toDateString(),
            location: 'Bucharest, RO'
        },
        author: 'James Doe',
        createdAt: new Date().toDateString(),
        description: 'The performance they announced 3 years ago!',
        text: 'If the aria-label is one tool used by assistive technologies (like screen readers),\n' +
            '                    it is not natively supported on browsers and has no effect on them.\n' +
            '                    It won\'t be of any help to most of the people targetted by the WCAG (except screen reader users),\n' +
            '                    for instance a person with intellectal disabilities.'
    },
];

const PostList = (props) => {
    return (
        <Grid container spacing={4}>
            <Toolbar/>
            {postsDetails.map((post) => (
                <Grid item>
                    <PostItem postDetails={post} key={post.id}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default PostList;