import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import PostItem from "../../timeline/PostItem";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import ChipArray from "../../../shared/ChipArray";

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
    const userInfo = props.userInfo;

    return (
        <React.Fragment>
            <Box className={classes.title} m={1}>
                <Avatar src={userInfo.profilePicture} className={classes.photo}/>
                <Typography component="h2" variant="h6" margin='normal' color="textPrimary">
                    {userInfo.firstName} {userInfo.lastName}
                </Typography>
            </Box>

            <Typography component="h3" variant="outlined" paragraph align="justify" margin='normal'>
                Description:
            </Typography>
            <Typography component="p" paragraph variant="body2" align="justify" margin='normal'>
                {userInfo.description}
            </Typography>
            <Divider/>
            <Box className={classes.content} mt={2}>
                {console.log(userInfo.bands)}
                {/*<ChipArray title='Favourite Bands' items={userInfo.bands}/>*/}
                {/*<ChipArray title='Favourite Musical Genres' items={userInfo.genres}/>*/}
                {/*<ChipArray title='Favourite Concerts Attended' items={userInfo.concerts}/>*/}
            </Box>


        </React.Fragment>

    );

};


export default ProfileDisplay;