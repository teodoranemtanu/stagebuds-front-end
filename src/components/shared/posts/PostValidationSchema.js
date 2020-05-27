import * as yup from "yup";

const postValidationSchema = yup.object({
    title: yup.string().required('Title of concert is required'),
    band: yup.string().required('Please provide the artists or bands'),
    location: yup.string().required('Please provide a location for the concert'),
    description: yup.string().required('Please enter a description for your post.'),
    date: yup.date().nullable().required('Please provide a valid date of the concert')
        .min(new Date(Date.now() - 1000 * 60 * 60 * 24), 'Please provide a future date')
});

export default postValidationSchema;