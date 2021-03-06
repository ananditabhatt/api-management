import React from 'react';
import classes from './Header.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import { display } from '@material-ui/system';

const Header = (props) => (
    <header className={classes.Header}>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated}  onSignUpWindow={props.onSignUpWindow}/>
        </nav>
    </header>
);


export default Header;