import React, {useContext, useEffect, useState} from 'react';
import {usePosition} from 'use-position';
import {useHttpClient} from "../../../hooks/http-hook";
import {AuthContext} from "../../../contexts/AuthContext";
import ConcertList from "./ConcertList";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import {useTheme} from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
    buttonsContainer: {
        width: '100%',
        background: theme.palette.secondary.light,
        display: 'flex',
        justifyContent: 'center',
        height: '50px',
        '& > *': {
            margin: theme.spacing(2),
        },
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    buttonItem: {
        color: theme.palette.secondary.white
    }
}));

const ConcertsDashboard = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const watch = true;
    const {latitude, longitude} = usePosition(watch);
    const auth = useContext(AuthContext);
    const {sendRequest} = useHttpClient();
    const [nearbyConcertData, setNearbyConcertData] = useState(null);
    const [profileConcertData, setProfileConcertData] = useState(null);
    const [displayMode, setDisplayMode] = useState('NEARBY');

    useEffect(() => {
        const getConcertsByLocation = async () => {
            try {
                const response = await sendRequest(
                    'http://localhost:5000/api/songkick/location/concerts',
                    'POST',
                    JSON.stringify({
                        lat: latitude,
                        lng: longitude
                    }), {
                        "Content-Type": 'application/json',
                        "Authorization": 'Bearer: ' + auth.token
                    }
                );
                setNearbyConcertData(response.concerts);
            } catch (err) {
                console.log(err);
            }
        };
        getConcertsByLocation();
    }, [auth.token, latitude, longitude, sendRequest]);

    const getProfileConcertData = async () => {
        console.log('click')
        try {
            const response = await sendRequest(
                'http://localhost:5000/api/songkick/artists/concerts',
                'GET', null,{
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer: ' + auth.token
                }
            );
            setProfileConcertData(response.concerts);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <React.Fragment>
            <Paper elevation={2} className={classes.buttonsContainer}>
                <ButtonGroup variant="text" className={classes.buttonItem} aria-label="contained primary button group">
                    <Button onClick={async () => {
                        setDisplayMode('NEARBY');
                    }}>Show nearby concerts</Button>
                    <Button onClick={async () => {
                        setDisplayMode('PROFILE');
                        await getProfileConcertData();
                    }}>Show concerts based on profile</Button>
                </ButtonGroup>
            </Paper>
            {nearbyConcertData && displayMode === 'NEARBY' && < ConcertList concerts={nearbyConcertData}/>}
            {profileConcertData && displayMode === 'PROFILE' && <ConcertList concerts={profileConcertData}/>}
        </React.Fragment>
    );

};

export default ConcertsDashboard;