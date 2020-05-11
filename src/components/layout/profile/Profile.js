import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Formik} from "formik";
import ProfileForm from "./ProfileForm";
import Grid from "@material-ui/core/Grid";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import ImageUpload from "./ImageUpload";

import {USER_INFO} from './DUMMY_USER_INFO';
import ProfileDisplay from "./ProfileDisplay";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(5),
    },
    title: {
        textAlign: 'center'
    },
    form: {
        width: '100%'
    }
}));


const Profile = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const addInformationText = 'Edit your profile information';
    const profilePictureText = 'Upload a new profile picture';
    return (
        <Grid container spacing={8} className={classes.container}>
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                <ProfileDisplay userInfo={USER_INFO}/>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Divider orientation="vertical"/>
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                <Typography component="h2" variant="h6" margin='normal' className={classes.title}>
                    {addInformationText}
                </Typography>
                <Formik
                    // initialValues={values}
                    // validationSchema={authValidationSchema}
                    // onSubmit={values => handleAuthSubmit(values)}
                >
                    {props => <ProfileForm {...props}/>}
                </Formik>
                <br/> <Divider/> <br/>
                <Typography component="h2" variant="h6" margin='normal' className={classes.title}>
                    {profilePictureText}
                </Typography>

                <ImageUpload/>
            </Grid>

        </Grid>
    );
};

export default Profile;