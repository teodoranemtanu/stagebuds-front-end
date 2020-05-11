import React, {useState} from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from "@material-ui/core/Button";
import {useTheme} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const PICTURE_LINK = "https://source.unsplash.com/2uSnxq3M4GE/640x426";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 2),
        display: "flex",
        height: "200",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
    },
    photo: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    }
}));


const ImageUpload = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [isOpenedDrawer, setOpenDrawer] = useState(false);
    const [files, setFiles] = useState([]);

    const handleClose = () => {
        setOpenDrawer(false);
    };

    const handleOpen = () => {
        console.log(isOpenedDrawer);
        setOpenDrawer(true);
    };

    const handleSave = (file) => {
        //Saving files to state for further use and closing Modal.
        setFiles([...files, file]);
        setOpenDrawer(false);
    };

    return (
        <Box m={2} className={classes.root}>
            <Avatar  src={PICTURE_LINK} className={classes.photo} />
            <br/>
            <Button
                onClick={handleOpen}
                variant="contained"
                fullWidth
                color='secondary'>
                Update your profile picture
            </Button>
            <DropzoneDialog
                open={isOpenedDrawer}
                onSave={handleSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleClose}
            />
        </Box>
    );
};

export default ImageUpload;