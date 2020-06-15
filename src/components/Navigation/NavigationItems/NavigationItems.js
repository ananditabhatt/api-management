import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <div>
            <span>
                {props.isAuthenticated ? <NavigationItem link='/landing' ><i className="material-icons">person</i></NavigationItem> : null}
            </span>
            <span style={{marginLeft: 'auto'}}>
                {props.isAuthenticated ? <NavigationItem link='/landing'>Home</NavigationItem> : null}
                {props.isAuthenticated ? <NavigationItem link='/logout'>SignOut</NavigationItem> : <NavigationItem link='/'>SignIn</NavigationItem>}
            </span>
        </div>
    </ul>
);

export default navigationItems;