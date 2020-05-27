import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import ChipInput from "material-ui-chip-input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    const [description, setDescription] = useState("");
    const [bandsChipValues, setBandsChipValues] = useState([]);
    const [genresChipValues, setGenresChipValues] = useState([]);
    const [concertsChipValues, setConcertsChipValues] = useState([]);

    const {
        handleChange,
        handleSendData
    } = props;
    
    useEffect(() => {
        setDescription(props.initialValues.description);
        setBandsChipValues(props.initialValues.bands);
        setGenresChipValues(props.initialValues.genres);
        setConcertsChipValues(props.initialValues.concerts);
    }, [props.initialValues]);

    const handleBandsChange = chip => {
        setBandsChipValues(chip);
    };

    const handleGenresChange = chip => {
        setGenresChipValues(chip);
    };

    const handleConcertsChange = chip => {
        setConcertsChipValues(chip);
    };

    const change = (name, e) => {
        e.persist();
        setDescription(e.target.value);
    };
    
    const sendData = (e) => {
        e.preventDefault();
        handleSendData(description, bandsChipValues, genresChipValues, concertsChipValues);
    };

    return (
        <form>
            <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='description'
                helperText='Your description'
                type="description"
                id="description"
                defaultValue={description}
                onChange={change.bind(null, 'description')}
                value={description}
                multiline
                rows={4}
            />
            <ChipInput
                defaultValue={bandsChipValues}
                fullWidth
                variant='outlined'
                label='Your preferred artists'
                margin='normal'
                placeholder='Type and press your favourite artists and bands'
                onChange={handleBandsChange}
                values={bandsChipValues}
            />
            <ChipInput
                defaultValue={genresChipValues}
                fullWidth
                variant="outlined"
                margin="normal"
                label='Your favourite musical genres'
                placeholder='Type and press your favourite genres'
                onChange={handleGenresChange}
            />
            <ChipInput
                defaultValue={concertsChipValues}
                fullWidth
                margin="normal"
                variant="outlined"
                label='Concerts you enjoyed the most'
                onChange={handleConcertsChange}
                placeholder='Type and press the name of the concerts you mostly enjoyed'
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                mt={2}
                color="primary"
                className={classes.submit}
                onClick={sendData}
            >
                {submitText}
            </Button>
        </form>
    );
};

export default ProfileForm;