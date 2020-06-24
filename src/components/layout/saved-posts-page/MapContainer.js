import React from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import Box from "@material-ui/core/Box";
import useTheme from "@material-ui/core/styles/useTheme";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {usePosition} from "use-position";

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

    const displayMarkers = () => {
        return props.savedPosts.map((post) => {
            return (
                <Marker key={post.id} id={post.id} position={{
                    lat: post.concertDetails.coordinates.lat,
                    lng: post.concertDetails.coordinates.lng
                }} onClick={() => alert("You clicked me!")}/>
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
        </Box>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC2mVmfd6eiQJELVogTThySXRyLcPhcT5c'
})(MapContainer);