import React, {useState} from 'react';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import Box from "@material-ui/core/Box";
import useTheme from "@material-ui/core/styles/useTheme";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import PostDataDisplay from "../../shared/posts/PostDataDisplay";

const useStyles = makeStyles((theme) => ({
    dimensions: {
        width: '35vw',
        height: '70vh',
    }
}));
const style = {
    width: '35vw',
    height: '70vh',
};

const MapContainer = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const renderPostDetails = () => {
        return (
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <PostDataDisplay mapMode={false} post={selectedPost}/>
            </Dialog>
        );
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const displayMarkers = () => {
        return props.savedPosts.map((post) => {
            return (
                <Marker key={post.id} id={post.id} position={{
                    lat: post.concertDetails.coordinates.lat,
                    lng: post.concertDetails.coordinates.lng
                }} onClick={() => {
                    console.log(post.author);
                    setSelectedPost(post);
                    setDialogOpen(true);
                }}/>
            );
        });
    };

    return (
        <Box style={{position: 'relative'}} className={classes.dimensions} component={Paper} elevation={6}>
            <Map
                google={props.google}
                zoom={8}
                style={style}
                initialCenter={{lat: props.latitude, lng: props.longitude}}
            >
                {displayMarkers()}
            </Map>
            {selectedPost && renderPostDetails()}
        </Box>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC2mVmfd6eiQJELVogTThySXRyLcPhcT5c'
})(MapContainer);