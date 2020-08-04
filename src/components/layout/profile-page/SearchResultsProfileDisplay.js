import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        width: '100%'
    },
    title: {
        textAlign: 'center'
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const SearchResultsProfileDisplay = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const users = props.location.state.searchResults;

    return (
        <Grid container spacing={3} className={classes.container}>
            {users.length > 0 && users.map(user => (
                <Grid item xl={10} sm={10} lg={10} md={10} className={classes.content}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="avatar" className={classes.avatar}>
                                {user.profilePicture ? <img src={user.profilePicture}
                                                            alt={user.firstName.charAt(0)}/>
                                    : user.firstName.charAt(0)}
                            </Avatar>
                        }
                        title={
                            <Typography variant="h6">
                                {user.firstName} {user.lastName}
                            </Typography>
                        }
                        subheader={
                            <Typography variant="overline" gutterBottom>
                                <Link href={`/profile/${user._id}`}>
                                    SEE FULL PROFILE
                                </Link>
                            </Typography>
                        }
                    />
                    <Divider/>
                </Grid>
            ))}
            {users.length === 0 &&
            <Typography variant="h6">
                No users with this name were found.
            </Typography>
            }
        </Grid>
    );
};

export default SearchResultsProfileDisplay;