import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";

const useStyes = makeStyles((theme) => ({
    chip: {
        margin: theme.spacing(0.5),
    }
}));

const ChipArray = (title, items) => {
    const theme = useTheme();
    const classes = useStyes(theme);
    // items = Array.from(items);
    return (
        <React.Fragment>
            <Typography component="h3" paragraph variant="outlined" align="justify" margin='normal'>
                {title}
            </Typography>
            <Box>
                {items.map((item) => (
                    <Chip label={item} className={classes.chip} color="secondary"/>
                ))}
            </Box>
        </React.Fragment>
    );
};

export default ChipArray;