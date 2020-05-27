import React, {useContext, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import CreatePostForm from "./CreatePostForm";
import {Formik} from "formik";
import * as yup from "yup";
import {useHttpClient} from "../../../hooks/http-hook";
import {AuthContext} from "../../../contexts/AuthContext";
import {Redirect} from "react-router-dom";
import PostValidationSchema from "../../shared/posts/PostValidationSchema";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        textAlign: 'center'
    },
    form: {
        width: '100%'
    }
}));

const CreatePost = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [redirect, setRedirect] = useState(false);
    const auth = useContext(AuthContext);
    const addInformationText = "Want to go to a specific concert? Create your own post and find your stage buds!";
    const initialFormValues = {title: '', description: '', band: '', date: null, location: ''};
    const postValidationSchema = PostValidationSchema;

    const handlePostSubmit = async (values) => {
        try {
            const responseData = await sendRequest(
                'http://localhost:5000/api/posts/',
                'POST',
                JSON.stringify({
                    concertDetails: {
                        title: values.title,
                        band: values.band,
                        date: values.date,
                        location: values.location
                    },
                    description: values.description,
                    timestamp: new Date(Date.now()).toJSON()
                }),
                {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer: ' + auth.token
                }
            );

            setRedirect(true);
            console.log(values)
        } catch (e) { console.log(e)}
    };

    return (
        <Grid container spacing={3} className={classes.container}>
            <Grid item xl={12} sm={12} lg={12} md={12}>
                <Typography component="h2" variant="h6" margin='normal' className={classes.title}>
                    {addInformationText}
                </Typography>
            </Grid>
            <Grid item xl={12} sm={12} lg={12} md={12}>
                <Formik
                    initialValues={initialFormValues}
                    validationSchema={postValidationSchema}
                    onSubmit={values => handlePostSubmit(values)}
                >
                    {props => <CreatePostForm {...props} />}
                </Formik>
                {redirect && <Redirect to="/"/>}
            </Grid>
        </Grid>
    );
};

export default CreatePost;
