import React from 'react';
import classes from './Header.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Header = (props) => (
    <header className={classes.Header}>
        {/* <div className={classes.Logo}><Logo /></div> */}
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Header;