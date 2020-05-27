import React, {useContext, useState} from 'react';
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
import {useHttpClient} from "../../../hooks/http-hook";
import {AuthContext} from "../../../contexts/AuthContext";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

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
    }
}));

const PostItem = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const post = props.postDetails;
    const postTimestamp = new Date(post.timestamp);
    const concertDate = new Date(post.concertDetails.date);

    const {sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);

    const [liked, setLiked] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);

    const handleLikeEvent = async () => {
        console.log(liked);
        if (liked === false) {
            const timestamp = new Date(Date.now());
            const responseData = await sendRequest(
                `http://localhost:5000/api/likes/${post.id}`,
                'POST',
                JSON.stringify({
                    timestamp: timestamp.toJSON()
                }),
                {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer: ' + auth.token
                }
            );
            setLiked(true);
        } else {
            try {
                const response = await sendRequest(`http://localhost:5000/api/likes/${post.id}`,
                    'DELETE', null,
                    {
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setLiked(false);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleDelete = () => {
        setDeleteDialog(true);
    };
    const handleEdit = () => {
        setEditDialog(true);
    };

    const postActions = () => {
        if (props.editMode) {
            return (
                <Box>
                    <Button variant="outlined" color="primary" className={classes.button}
                            onClick={handleEdit}> EDIT </Button>
                    <Button variant="outlined" color="secondary" className={classes.button}
                            onClick={handleDelete}> DELETE </Button>
                </Box>
            );
        } else {
            return (
                <Box>
                    <IconButton aria-label="add to favorites" onClick={handleLikeEvent} className={clsx({
                        [classes.liked]: liked,
                    })}>
                        <FavoriteIcon/>
                    </IconButton>
                    <IconButton aria-label="share" onClick={() => {
                        alert('SHARE!')
                    }}>
                        <ShareIcon/>
                    </IconButton>
                </Box>
            );
        }
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="avatar" className={classes.avatar}>
                        {post.author.profilePicture ? <img src={post.author.profilePicture}
                                                           alt={post.author.firstName.charAt(0)}/>
                            : post.author.firstName.charAt(0)}
                    </Avatar>
                }
                title={
                    <Typography variant="h6" gutterBottom>
                        {post.concertDetails.title} on {concertDate.toDateString()}
                    </Typography>
                }
                subheader={
                    <Typography variant="overline" gutterBottom>
                        <Link href={`/profile/${post.author.id}`}>
                            posted by {post.author.firstName} {post.author.lastName} on {postTimestamp.toDateString()}
                        </Link>
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {postActions()}
                {deleteDialog &&
                <DeleteDialog setDeleteDialog={setDeleteDialog}
                              open={deleteDialog} postId={post.id}
                              deletePost={props.deletePost}
                />}
                {editDialog &&
                <EditDialog setEditDialog={setEditDialog} open={editDialog}
                            editPost={props.editPost} post={post}
                />}
            </CardActions>
        </Card>
    );
};

export default PostItem;