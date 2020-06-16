import React, { useState, useEffect } from 'react';
import classes from './Parallax.css';
import img from '../../assets/background.png';
import {Parallax, Background }from 'react-parallax';


const parallax = props => {

    return (
        <div>
      	
        <Parallax
            bgImage={img}
            bgImageAlt="the cat"
            strength={-200}>
            <div style={{ height: '77vh' }} />
        </Parallax>
        <Parallax strength={300}>
            <div style={{height:'70vh'}}>Use the background component for custom elements</div>
            <Background className="custom-bg">
                <img src={img} alt="fill murray" />
            </Background>
        </Parallax>
        <Parallax
            //blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={200}>
            <div style={{ height: '90vh' }} />
        </Parallax>
        <Parallax strength={300}>
            <div style={{height:'70vh'}}>Use the background component for custom elements</div>
            <Background className="custom-bg">
                <img src={img} alt="fill murray" />
            </Background>
        </Parallax>

        {/* -----renderProp: "renderLayer"-----*/}
        <Parallax
            //blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={200}>
            <div style={{ height: '90vh' }} />
        </Parallax>
      </div>
    );
    }
export default parallax;