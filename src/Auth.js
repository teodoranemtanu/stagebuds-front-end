import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {
    Formik
} from 'formik';

import AuthForm from "./AuthForm";
import * as yup from "yup";

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const values = {firstName: '', lastName: '', email: '', password: ''};

    const handleModeChange = (newLoginMode) => {
        setIsLoginMode(newLoginMode);
    };

    const authValidationSchema = yup.object({
            firstName: !isLoginMode && yup.string().required('First name is required'),
            lastName:  !isLoginMode && yup.string().required('First name is required'),
            email: yup.string().email('Please provide a valid email address').required('Email is required'),
            password: yup.string().required('Password is required').min(6, 'Your password should have at least 8 characters')
        });

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                {isLoginMode ? 'Sign in' : 'Create Account'}
            </Typography>

            <Formik
                initialValues={values}
                validationSchema={authValidationSchema}
                onSubmit={(values => {console.log(values)})}
            >
                {props => <AuthForm {...props} onModeChange={handleModeChange} isLoginMode={isLoginMode} />}
            </Formik>
        </React.Fragment>
    );
};

export default (Auth);

