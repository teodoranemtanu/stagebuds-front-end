import React, {useContext, useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import {makeStyles} from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import red from "@material-ui/core/colors/red";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import {useHttpClient} from "../../../hooks/http-hook";
import {AuthContext} from "../../../contexts/AuthContext";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import MapComponent from "./MapComponent";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import './mapStyle.css';
import PostDataDisplay from "./PostDataDisplay";

const useStyles = makeStyles((theme) => ({
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

    const {sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);

    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [mapDialog, setMapDialog] = useState(false);

    useEffect(() => {
        const getPostLike = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/likes/liked/${post.id}`,
                    'GET', null,
                    {
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setLiked(response.liked);
            } catch (e) {
                console.log(e);
            }
        };
        getPostLike();
        setSaved(props.saved);
    }, [auth.token, post.id, props.saved, sendRequest]);

    const handleLikeEvent = async () => {
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
            props.notificationSocket.emit('addLike', {userId: auth.userId, postId: post.id});
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
    const handleMap = () => {
        setMapDialog(true);
    };

    const handleMapClose = () => {
        setMapDialog(false);
    };

    const handleSaveEvent = async () => {
        if (saved === false) {
            const responseData = await sendRequest(
                'http://localhost:5000/api/users/savePost',
                'POST',
                JSON.stringify({
                    postId: post._id
                }), {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer: ' + auth.token
                }
            );
            console.log(responseData);
            setSaved(true);
        } else {
            try {
                const response = await sendRequest('http://localhost:5000/api/users/unSavePost',
                    'POST',
                    JSON.stringify({
                        postId: post.id
                    }), {
                        "Content-Type": 'application/json',
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setSaved(false);
                console.log(response);
            } catch (e) {
                console.log(e);
            }
        }
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
                    <IconButton aria-label="share" className={clsx({
                        [classes.liked]: saved,
                    })} onClick={handleSaveEvent}>
                        <ShareIcon/>
                    </IconButton>
                </Box>
            );
        }
    };

    return (
        <Card className={classes.root}>
            <PostDataDisplay post={post} handleMap={handleMap} mapMode={true}/>
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
                {mapDialog &&
                <Dialog
                    className={classes.mapDialog}
                    open={mapDialog}
                    onClose={handleMapClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Show on map"}</DialogTitle>
                    <DialogContent className="map-container">
                        <MapComponent center={post.concertDetails.coordinates} zoom={14}/>
                    </DialogContent>
                </Dialog>
                }
            </CardActions>
        </Card>
    );
};

export default PostItem;