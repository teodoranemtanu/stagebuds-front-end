import React, {useCallback, useContext, useEffect, useState} from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from "@material-ui/core/Button";
import {useTheme} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import {AuthContext} from "../../../contexts/AuthContext";
import {useHttpClient} from "../../../hooks/http-hook";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
        display: "flex",
        height: "200",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
    },
    photo: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    loading: {
        textAlign: 'center'
    }
}));

const ImageUpload = (props) => {
    const theme = useTheme();
    const auth = useContext(AuthContext);
    const classes = useStyles(theme);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const [isOpenedDrawer, setOpenDrawer] = useState(false);
    const [profilePicture, setProfilePicture] = useState(props.profilePicture);

    useEffect(() => {
        setProfilePicture(props.profilePicture);
    }, [props.profilePicture]);

    useEffect(()=> {
        props.onUpdate(profilePicture);
    }, [profilePicture]);

    const handleClose = () => {
        setOpenDrawer(false);
    };

    const handleOpen = () => {
        setOpenDrawer(true);
    };

    const handleSave = useCallback(async (file) => {
        // file will be an array; access it with file[0]
        //Saving files to state for further use and closing Modal.
        const formData = new FormData();
        let response;
        formData.append('image', file[0]);
        try {
            response = await sendRequest(
                'http://localhost:5000/api/users/uploadImage',
                'POST',
                formData,
                {
                    "Authorization": 'Bearer: ' + auth.token
                }
            );
        } catch (err) {
            console.log(err);
        }

        if (response) {
            setProfilePicture(response.data);
        }
        setOpenDrawer(false);
    }, [auth.token, sendRequest]);

    return (
        <Box m={2} className={classes.root}>
            <Avatar src={profilePicture} className={classes.photo}/>
            <br/>
            <Button
                onClick={handleOpen}
                variant="contained"
                fullWidth
                color='secondary'>
                Update your profile picture
            </Button>
            <DropzoneDialog
                open={isOpenedDrawer}
                onSave={handleSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/jpg']}
                maxFileSize={5000000}
                onClose={handleClose}
                filesLimit={1}
                dropzoneText="Drag or click here to add a new photo."
            />
        </Box>
    );
};

export default ImageUpload;