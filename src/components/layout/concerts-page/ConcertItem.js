import React, {useContext, useState} from 'react';
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
import Button from "@material-ui/core/Button";
import {useHttpClient} from "../../../hooks/http-hook";
import {AuthContext} from "../../../contexts/AuthContext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ChipArray from "../../shared/ChipArray";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    },
    loading: {
        textAlign: 'center'
    }
}));

const ConcertItem = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [mapDialog, setMapDialog] = useState(false);
    const [setlistDialog, setSetlistDialog] = useState(false);
    const [setlists, setSetlists] = useState([]);
    const {sendRequest, isLoading} = useHttpClient();
    const auth = useContext(AuthContext);

    const handleMap = () => {
        setMapDialog(true);
    };

    const handleMapClose = () => {
        setMapDialog(false);
    };

    const handleConcertSetlist = async () => {
        setSetlistDialog(true);
        try {
            const response = await sendRequest(
                'http://localhost:5000/api/songkick/concerts/setlist',
                'POST', JSON.stringify({
                    performances: props.concert.performance
                }), {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer: ' + auth.token
                }
            );
            setSetlists(response.data);
            console.log(response.data)
        } catch (err) {
            console.log(err);
        }
    };
    const handleSetlistClose = () => {
        setSetlistDialog(false);
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
                        <Button variant="outlined" color="primary" className={classes.button}
                                onClick={handleConcertSetlist}>Possible Setlist</Button>
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
                {setlistDialog &&
                <Dialog
                    // className={classes.mapDialog}
                    open={setlistDialog}
                    onClose={handleSetlistClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Possible Concert Setlist"}</DialogTitle>
                    <DialogContent>
                        <div className={classes.loading}>
                            {isLoading && <CircularProgress disableShrink/>}
                        </div>
                        {!isLoading && <List>
                            {setlists.length > 0 &&
                            setlists.map((setlist) => (
                                <ListItem>
                                    <ChipArray title={setlist.artist}
                                               items={setlist.futureSetlist.map(item => item.title)}/>
                                </ListItem>
                            ))}
                            {!setlists.length &&
                            <ListItem>
                                <Typography>
                                    Possible setlist could not be found.
                                </Typography>
                            </ListItem>
                            }
                        </List>}
                    </DialogContent>
                </Dialog>}
            </CardActions>
        </Card>
    );
};

export default ConcertItem;