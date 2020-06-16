import React from 'react';
import classes from './Logo.css';
import {NavLink } from 'react-router-dom';
import telstrablue from '../../assets/telstrablue.png'

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
       <NavLink to="/"><img src={telstrablue} alt="Home" /></NavLink>
    </div>
);

export default logo;