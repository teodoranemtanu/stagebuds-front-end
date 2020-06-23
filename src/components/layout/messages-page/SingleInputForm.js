import React from 'react';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";

const SingleInputForm = (props) => {
    const {
        values,
        classes,
        handleChange,
        setFieldTouched,
        handleSubmit,
        placeholderText
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField className={classes}
                       margin="normal"
                       label={placeholderText}
                       variant="outlined"
                       name="message"
                       value={values.message || ''}
                       onChange={change.bind(null, "message")}
                       InputProps={{
                           endAdornment: (
                               <InputAdornment position="end">
                                   <IconButton type="submit">
                                       <SendIcon/>
                                   </IconButton>
                               </InputAdornment>
                           ),
                       }}
            />
        </form>
    );
};

export default SingleInputForm;