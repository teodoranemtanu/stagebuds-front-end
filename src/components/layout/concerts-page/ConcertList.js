import React from 'react';
import Grid from "@material-ui/core/Grid";
import ConcertItem from "./ConcertItem";


const ConcertList = (props) => {
    return (
        <Grid container spacing={3}>
            {props.concerts.map((concert) => (
                <Grid item xl={12} sm={12} lg={12} md={12}>
                    <ConcertItem concert={concert}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default ConcertList;