import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreatePostForm from "../../layout/create-post/CreatePostForm";
import {Formik} from "formik";
import PostValidationSchema from "./PostValidationSchema";

const EditDialog = (props) => {
    const postValidationSchema = PostValidationSchema;
    const initialFormValues = {
        title: props.post.concertDetails.title,
        description: props.post.description,
        band: props.post.concertDetails.band,
        date: props.post.concertDetails.date,
        location: props.post.concertDetails.location
    };

    const handleClose = () => {
        props.setEditDialog(false);
    };

    const handleAgree = async (values) => {
        await props.editPost(values, props.post.id);
        props.setEditDialog(false);
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Edit post"}</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialFormValues}
                    validationSchema={postValidationSchema}
                    onSubmit={handleAgree}
                >
                    {props => <CreatePostForm {...props} editMode={true}/>}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default EditDialog;