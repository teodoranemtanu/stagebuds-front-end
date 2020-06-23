import React, {useState} from 'react';
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import MapIcon from "@material-ui/icons/Map";
import CardActions from "@material-ui/core/CardActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import MapComponent from "../../shared/posts/MapComponent";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import {useTheme} from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";

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
    button: {
        margin: theme.spacing(1)
    },
    locationBox: {
        display: 'flex'
    },
    chip: {
        margin: theme.spacing(0.5),
        overflowWrap: 'break-word',
    }
}));

const ConcertItem = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [mapDialog, setMapDialog] = useState(false);

    const handleMap = () => {
        setMapDialog(true);
    };

    const handleMapClose = () => {
        setMapDialog(false);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography variant="h6">
                        {props.concert.displayName}
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant="subtitle2" color="textPrimary" component="p">
                    Artist:
                </Typography>
                {
                    props.concert.performance.map((performance) => {
                        return (
                            <Chip label={performance.artist.displayName} className={classes.chip} color="secondary"/>)
                    })
                }
                <Divider/>
                <br/>

                <Typography variant="subtitle2" color="textPrimary" component="p">
                    {props.concert.type === 'Concert' && 'Date:'}
                    {props.concert.type === 'Festival' && 'Start Date'}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p" gutterBottom paragraph>
                    {props.concert.start.date}
                </Typography>
                <Divider/>
                <br/>

                {props.concert.type === 'Festival' &&
                <React.Fragment>
                    <Typography variant="subtitle2" color="textPrimary" component="p">
                        End Date
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p" gutterBottom paragraph>
                        {props.concert.end.date}
                    </Typography>
                    <Divider/>
                    <br/>
                </React.Fragment>}

                <Typography variant="subtitle2" color="textPrimary" component="p">
                    Type:
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p" gutterBottom paragraph>
                    {props.concert.type}
                </Typography>
                <Divider/>
                <br/>

                <Box className={classes.locationBox}>
                    <Box>
                        <Typography variant="subtitle2" color="textPrimary" component="p">
                            Location:
                        </Typography>
                        <Typography variant="body2" color="textPrimary" component="p" gutterBottom paragraph>
                            {props.concert.venue.displayName}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton variant="outlined" color="primary" className={classes.button}
                                    onClick={handleMap}>
                            <MapIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
            <CardActions disableSpacing>
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
                        <MapComponent center={{
                            lat: props.concert.venue.lat,
                            lng: props.concert.venue.lng
                        }} zoom={16}/>
                    </DialogContent>
                </Dialog>}
            </CardActions>
        </Card>
    );
};

export default ConcertItem;