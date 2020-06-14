import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Sign Out</NavigationItem>
        <NavigationItem link='/orders'>Home</NavigationItem>
    </ul>
);

export default navigationItems;