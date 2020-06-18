import React from 'react';
import classes from './Spinner.css'

const Spinner = () => {
    return (
        <div className={classes.container}>
        <div className={classes.loader} >Loading...</div>
        </div>
    );
}

export default Spinner;