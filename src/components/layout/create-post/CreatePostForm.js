import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";


const useStyles = makeStyles((theme) => ({
    form: {
        // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.primary.dark
    },
    secondaryText: {
        color: theme.palette.primary.dark
    },
    datePicker: {
        width: '100%'
    }
}));

const CreatePostForm = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {
        values,
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        onModeChange,
        handleSubmit,
        initialValues
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    // const test = () => {
    //     console.log(initialValues, initialValues.title);
    //     if(typeof(initialValues.title) != "undefined") {
    //         return initialValues.title;
    //     } else{
    //         return "title";
    //     }
    // };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Typography component="p" variant="outlined" margin='normal'>
                Enter some information about the concert:
            </Typography>
            <TextField
                defaultValue={initialValues.title}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title of concert"
                name="title"
                autoComplete="title"
                autoFocus
                helperText={touched.title ? errors.title : ""}
                error={touched.title && Boolean(errors.title)}
                onChange={change.bind(null, "title")}
            />
            <TextField
                variant="outlined"
                defaultValue={initialValues.band}
                margin="normal"
                required
                fullWidth
                name="band"
                label="Artist"
                id="band"
                autoComplete="band"
                helperText={touched.band ? errors.band : ""}
                error={touched.band && Boolean(errors.band)}
                onChange={change.bind(null, "band")}
            />
            <TextField
                variant="outlined"
                margin="normal"
                defaultValue={initialValues.location}
                required
                fullWidth
                name="location"
                label="Location of concert"
                id="location"
                autoComplete="location"
                helperText={touched.location ? errors.location : ""}
                error={touched.location && Boolean(errors.location)}
                onChange={change.bind(null, "location")}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={classes.datePicker}
                    id="date-picker-dialog"
                    label="Date of concert"
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    defaultValue={initialValues.date}
                    value={values.date}
                    margin="normal"
                    disablePast
                    onChange={value => props.setFieldValue("date", value)}
                    KeyboardButtonProps={{
                        "aria-label": "change date"
                    }}
                />
            </MuiPickersUtilsProvider>
            <Typography component="p" variant="outlined" margin='normal'>
                Enter a description for your post.
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description of your post"
                id="description"
                defaultValue={initialValues.description}
                autoComplete="description"
                multiline
                rows={4}
                helperText={touched.description ? errors.description : ""}
                error={touched.description && Boolean(errors.description)}
                onChange={change.bind(null, "description")}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isValid}
                className={classes.submit}
            >
                {props.editMode ? "Edit your post" : "Create your post"}
            </Button>
        </form>
    );
};

export default CreatePostForm;