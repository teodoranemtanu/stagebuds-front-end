import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import ChipInput from "material-ui-chip-input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ImageUpload from "./ImageUpload";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

const ProfileForm = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const submitText = 'Edit your profile';
    // const {
    //     values: { firstName, lastName, email, password },
    //     errors,
    //     touched,
    //     handleChange,
    //     isValid,
    //     setFieldTouched,
    //     isLoginMode,
    //     onModeChange,
    //     handleSubmit
    // } = props;

    return (
        <form>
            <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='description'
                label='Your description'
                type="description"
                id="description"
                multiline
                rows={4}
                // onChange={change.bind(null, "password")}
            />
            <ChipInput
                defaultValue={[]}
                fullWidth
                variant='outlined'
                label='Your preferred artists'
                margin='normal'
                placeholder='Type and press your favourite artists and bands'
                // onChange={handleArtistInputChange}
            />
            <ChipInput
                defaultValue={[]}
                fullWidth
                variant="outlined"
                margin="normal"
                label='Your favourite musical genres'
                placeholder='Type and press your favourite genres'
                // onChange={handleArtistInputChange}
            />
            <ChipInput
                defaultValue={[]}
                fullWidth
                margin="normal"
                variant="outlined"
                label='Concerts you enjoyed the most'
                placeholder='Type and press the name of the concerts you mostly enjoyed'
                // onChange={handleArtistInputChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                mt={2}
                color="primary"
                className={classes.submit}
            >
                {submitText}
            </Button>
        </form>
    );
};

export default ProfileForm;