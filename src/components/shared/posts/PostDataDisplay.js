import React from 'react';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import MapIcon from "@material-ui/icons/Map";
import Card from "@material-ui/core/Card";
import useTheme from "@material-ui/core/styles/useTheme";
import {makeStyles} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    liked: {
        color: red[500]
    },
    button: {
        margin: theme.spacing(1)
    },
    locationBox: {
        display: 'flex'
    },
}));

const PostDataDisplay = (props) => {
    const post = props.post;
    const postTimestamp = new Date(post.timestamp);
    const concertDate = new Date(post.concertDetails.date);
    const theme = useTheme();
    const classes = useStyles(theme);


    return (
        <React.Fragment>
            <CardHeader
                avatar={
                    <Avatar aria-label="avatar" className={classes.avatar}>
                        {post.author.profilePicture ? <img src={post.author.profilePicture}
                                                           alt={post.author.firstName.charAt(0)}/>
                            : post.author.firstName.charAt(0)}
                    </Avatar>
                }
                title={
                    <Typography variant="h6">
                        {post.concertDetails.title}
                    </Typography>
                }
                subheader={
                    <Typography variant="overline" gutterBottom>
                        <Link href={`/profile/${post.author.id}`}>
                            posted
                            by {post.author.firstName} {post.author.lastName} on {postTimestamp.toLocaleDateString(undefined, options)}
                        </Link>
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant="subtitle2" color="textPrimary" component="p">
                    Band:
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p" gutterBottom paragraph>
                    {post.concertDetails.band}
                </Typography>
                <Typography variant="subtitle2" color="textPrimary" component="p">
                    Date:
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p" gutterBottom paragraph>
                    {concertDate.toLocaleDateString(undefined, options)}
                </Typography>
                <Divider/>
                <br/>
                <Box className={classes.locationBox}>
                    <Box>
                        <Typography variant="subtitle2" color="textPrimary" component="p">
                            Location:
                        </Typography>
                        <Typography variant="body2" color="textPrimary" component="p" gutterBottom paragraph>
                            {post.concertDetails.location}
                        </Typography>
                        <Divider/>
                        <br/>
                    </Box>
                    {props.mapMode && <Box>
                        <IconButton variant="outlined" color="primary" className={classes.button}
                                    onClick={props.handleMap}>
                            <MapIcon/>
                        </IconButton>
                    </Box>}
                </Box>
                <Typography variant="subtitle2" color="textPrimary" component="p">
                    Description:
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p" gutterBottom paragraph>
                    {post.description}
                </Typography>
            </CardContent>
        </React.Fragment>
    );
};

export default PostDataDisplay;