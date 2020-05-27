import React, {useCallback, useContext, useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import ProfileForm from "./ProfileForm";
import Grid from "@material-ui/core/Grid";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import ImageUpload from "./ImageUpload";
import ProfileDisplay from "../../shared/ProfileDisplay";
import {AuthContext} from "../../../contexts/AuthContext";
import {useHttpClient} from "../../../hooks/http-hook";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
    },
    title: {
        textAlign: 'center'
    },
    form: {
        width: '100%'
    }
}));

const Profile = (props) => {
    const addInformationText = 'Edit your profile information';
    const profilePictureText = 'Upload a new profile picture';

    const theme = useTheme();
    const classes = useStyles(theme);
    const auth = useContext(AuthContext);
    const {sendRequest} = useHttpClient();

    // const [displayData, setDisplayData] = useState({});
    //
    // const fetchedData = useDisplayProfileData(auth.userId);
    //
    // useEffect(() => {
    //     console.log(fetchedData);
    //     setDisplayData(fetchedData);
    // }, [fetchedData]);
    //

    const [profileData, setProfileData] = useState({});
    const [userData, setUserData] = useState({});
    const [displayData, setDisplayData] = useState({});

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/profiles/${auth.userId}`,
                    'GET', null,
                    {
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setProfileData(response);
            } catch (e) {
                console.log(e);
            }
        };
        const getUserData = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/users/${auth.userId}`,
                    'GET', null,
                    {
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setUserData(response);
            } catch (e) {
                console.log(e);
            }
        };
        getUserData();
        getProfileData();
    }, [sendRequest]);

    useEffect(() => {
        setDisplayData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            profilePicture: userData.profilePicture,
            description: profileData.description,
            bands: profileData.bands,
            genres: profileData.genres,
            concerts: profileData.concerts
        });
    }, [userData, profileData, setDisplayData]);

    const updateProfilePicture = useCallback((picture) => {
        let newDisplayData = {
            firstName: displayData.firstName,
            lastName: displayData.lastName,
            profilePicture: picture,
            description: displayData.description,
            bands: displayData.bands,
            genres: displayData.genres,
            concerts: displayData.concerts
        };
        setDisplayData(newDisplayData);
    }, [displayData, setDisplayData]);

    const handleSendData = useCallback(async (description, bands, genres, concerts) => {
        let responseData;
        try {
            responseData = await sendRequest(
                `http://localhost:5000/api/profiles/${auth.userId}`,
                'PUT',
                JSON.stringify({
                    description, bands, genres, concerts
                }),
                {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer: ' + auth.token
                }
            );
        } catch (e) {
            console.log(e)
        }

        if (responseData) {
            const newDisplayData = {
                description, bands, genres, concerts,
                profilePicture: displayData.profilePicture,
                firstName: displayData.firstName,
                lastName: displayData.lastName
            };
            setDisplayData(newDisplayData);
        }
    }, [auth.token, auth.userId, displayData.firstName, displayData.lastName, displayData.profilePicture, sendRequest]);

    const profileDisplay = () => {
        return <ProfileDisplay userInfo={displayData}/>
    };

    return (
        <Grid container spacing={3} className={classes.container}>
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                {profileDisplay()}
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Divider orientation="vertical"/>
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                <Typography component="h2" variant="h6" margin='normal' className={classes.title}>
                    {addInformationText}
                </Typography>
                <ProfileForm initialValues={displayData} handleSendData={handleSendData}/>

                <br/> <Divider/> <br/>
                <Typography component="h2" variant="h6" margin='normal' className={classes.title}>
                    {profilePictureText}
                </Typography>
                <ImageUpload profilePicture={displayData.profilePicture} onUpdate={updateProfilePicture}/>
            </Grid>
        </Grid>
    );
};

export default Profile;