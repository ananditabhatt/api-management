import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import img from '../../assets/background.jpg';
import {Parallax }from 'react-parallax';


const parallax = () => {
    // useEffect(() => {
    //     let elements = document.querySelectorAll('.parallax');
    //     M.Parallax.init(elements);
    // }, []);

    return (
        // <div className='container'>
        //     <div className='parallax-container'>
        //         <div className='parallax'>
        //             <img style={{position: 'fixed'}} src={img} alt='IMAGE' />
        //         </div>
        //     </div>
        // </div>
        <div>
      	<Parallax bgImage={img} strength={300}>
            <h1>first parallax section</h1>
        </Parallax>
        <Parallax bgImage={img}>
            <br/>
            <h1>second parallax </h1>
            <br/>
        </Parallax>
      </div>
    );
    }
export default parallax;