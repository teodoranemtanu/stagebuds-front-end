import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

// should contain:
//     concert details: name, date, location
//     author
//     date-created
//     description
//     text
// these wil be received via props

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const PostItem = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const post = props.postDetails;
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="avatar" className={classes.avatar}>
                        {post.profilePicture ? <img src={post.profilePicture} alt={post.author.charAt(0)}/> : post.author.charAt(0)}
                    </Avatar>
                }
                title={
                    <Typography variant="h6" gutterBottom>
                        {post.concertDetails.title} on {post.concertDetails.date}
                    </Typography>
                }
                subheader={
                    <Typography variant="overline" gutterBottom>
                        posted by {post.author} on {post.createdAt}
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => {alert('LIKE!')}}>
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" onClick={() => {alert('SHARE!')}}>
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default PostItem;