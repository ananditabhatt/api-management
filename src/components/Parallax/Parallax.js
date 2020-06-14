import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import img from '../../assets/background.jpg';


const parallax = () => {
    useEffect(() => {
        let elements = document.querySelectorAll('.parallax');
        M.Parallax.init(elements);
    }, []);

    return (
        <div className='container'>
            <div className='parallax-container'>
                <div className='parallax'>
                    <img style={{position: 'fixed'}} src={img} alt='IMAGE' />
                </div>
            </div>
        </div>
    );
}

export default parallax;