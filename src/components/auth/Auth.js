import React, {useContext, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {
    Formik
} from 'formik';

import AuthForm from "./AuthForm";
import * as yup from "yup";
import {useHttpClient} from "../../hooks/http-hook";
import {AuthContext} from "../../contexts/AuthContext";

const Auth = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const [isLoginMode, setIsLoginMode] = useState(true);
    const values = {firstName: '', lastName: '', email: '', password: ''};

    const handleModeChange = (prevMode) => {
        setIsLoginMode(prevMode => !prevMode);
    };

    const handleAuthSubmit = async (values) => {

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: values.email,
                        password: values.password
                    }),
                    {
                        "Content-Type": 'application/json'
                    }
                );
                auth.login(responseData.userId, responseData.token);
            } catch (e) { console.log(e)}
        } else {
            try {
                console.log(values);
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    JSON.stringify({
                        email: values.email,
                        password: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName
                    }),
                    {
                        "Content-Type": 'application/json'
                    }
                );
                auth.login(responseData.userId, responseData.token);
            } catch (e) {console.log(e)}
        }
    };

    const authValidationSchema = yup.object({
        firstName: !isLoginMode && yup.string().required('First name is required'),
        lastName: !isLoginMode && yup.string().required('First name is required'),
        email: yup.string().email('Please provide a valid email address').required('Email is required'),
        password: yup.string().required('Password is required').min(6, 'Your password should have at least 6 characters')
    });

    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                {isLoginMode ? 'Sign in' : 'Create Account'}
            </Typography>

            <Formik
                initialValues={values}
                validationSchema={authValidationSchema}
                onSubmit={values => handleAuthSubmit(values)}
            >
                {props => <AuthForm {...props} onModeChange={handleModeChange} isLoginMode={isLoginMode}/>}
            </Formik>
        </React.Fragment>
    );
};

export default Auth;

