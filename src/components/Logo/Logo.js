import React from 'react';
import classes from './Logo.css';
import {NavLink } from 'react-router-dom';
import telstrablue from '../../assets/telstrablue.png'
import { width } from '@material-ui/system';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height,display:"flex"}}>
       <NavLink to="/"><img src={telstrablue} alt="Home" style={{    width: "8vh"}}/></NavLink>
       <NavLink to="/"><i  style={{ color:"white",width:"30px",fontWeight:"bold"}}>for developers</i></NavLink>
       
    </div>
);

export default logo;