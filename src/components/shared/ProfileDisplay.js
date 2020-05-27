import React from 'react';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ChipArray from "./ChipArray";

const useStyles = makeStyles(theme => ({
    root: {},
    title: {
        display: "flex",
        alignItems: "center",
    },
    photo: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: theme.spacing(3)
    },
    chip: {
        margin: theme.spacing(0.5),
    }
}));

const ProfileDisplay = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <React.Fragment>
            <Box className={classes.title} m={1}>
                <Avatar src={props.userInfo.profilePicture} className={classes.photo}/>
                <Typography component="h2" variant="h6" margin='normal' color="textPrimary">
                    {props.userInfo.firstName} {props.userInfo.lastName}
                </Typography>
            </Box>

            <Typography component="h3" variant="outlined" paragraph align="justify" margin='normal'>
                Description:
            </Typography>
            <Typography component="p" paragraph variant="body2" align="justify" margin='normal'>
                {props.userInfo.description}
            </Typography>
            <Divider/>
            <Box className={classes.content} mt={2}>
                <ChipArray title='Favourite Bands' items={props.userInfo.bands}/>
                <ChipArray title='Favourite Musical Genres' items={props.userInfo.genres}/>
                <ChipArray title='Favourite Concerts Attended' items={props.userInfo.concerts}/>
            </Box>
        </React.Fragment>
    );
};

export default ProfileDisplay;