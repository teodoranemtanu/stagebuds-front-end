import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {getSidePageStyle} from "./SidePageStyle";


const signUpText = "Don't have an account? Sign up!";
const signInText = "Already have an account? Sign in";

const AuthForm = (props) => {
    const styles = theme => getSidePageStyle(theme);
    const {
        values: { firstName, lastName, email, password },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        isLoginMode,
        onModeChange,
        handleSubmit
    } = props;


    const switchModeHandler = (isLoginMode) => {
        onModeChange(!isLoginMode);
    };

    const change = (name, e) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };

    return (
        <form className={'form'}  onSubmit={handleSubmit}>
            <div>
                {console.log()}
            </div>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                onChange={change.bind(null, "email")}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                onChange={change.bind(null, "password")}
            />
            {!isLoginMode && <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="firstName"
                label="First Name"
                id="firstName"
                onChange={change.bind(null, "firstName")}
                helperText={touched.firstName ? errors.firstName : ""}
                error={touched.firstName && Boolean(errors.firstName)}
            />}
            {!isLoginMode && <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
                onChange={change.bind(null, "lastName")}
                helperText={touched.lastName ? errors.lastName : ""}
                error={touched.lastName && Boolean(errors.lastName)}
            />}
            {/*{!isLoginMode &&*/}
            {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
            {/*    <DatePicker*/}
            {/*        label="Date of Birth"*/}
            {/*        disableFuture*/}
            {/*        format="dd/MM/yyyy"*/}
            {/*        views={["year", "month", "date"]}*/}
            {/*        onChange={handleChange}*/}
            {/*    />*/}
            {/*</MuiPickersUtilsProvider>}*/}
            {isLoginMode && <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
            />}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isValid}
                className={styles.submit}
            >
                {isLoginMode ? 'Sign In' : 'Create Account'}
            </Button>
            <Grid container>
                {isLoginMode && <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>}
                <Grid item>
                    <Link href="#" onClick={switchModeHandler} variant="body2">
                        {isLoginMode ? signUpText : signInText}
                    </Link>
                </Grid>
            </Grid>
        </form>
    );
};

export default AuthForm;