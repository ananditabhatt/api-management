import React, { useEffect } from 'react';
import img1 from '../../../assets/background1.png';
import M from 'materialize-css';
import img from '../../../assets/telstra2.jpg'

const carousels = props => {

    useEffect(() => {
        let elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems, { numVisible: 3, indicators: true, fullWidth: true, });
    }, []);

    const cards = (
        // <div className="row">
            // <div className="col s12 m10">
                <div className="card">
                    <div style= {{height:'32vh', width:'51vh', color:'#1d4954'}} className="card-image">
                        <img width='20vh' src={img} />
                        {/* <span style= {{color:'#1d4954', padding: '1vh'}} className="card-title">Tech and Inovation</span> */}
                    </div>
                    {/* <div style= {{color:'#1d4954', padding: '0' }}  className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
                    </div> */}
                    <div className="card-action">
                        <a style= {{color:'#1d4954;'}} href='https://exchange.telstra.com.au/introducing-telstras-new-api-portal/'>Technology and Innovation</a>
                    </div>
                </div>
            // </div>
        // </div>
    );

    return (
        //     <div style={{maxWidth: '80vh'}} className="carousel">
        //     <a className="carousel-item" href="#one!"><img src={img} /></a>
        //     <a className="carousel-item" href="#two!"><img src={img} /></a>
        //   </div>
        <div style={{height: '48vh', width:'50vh'}} className="carousel carousel-slider center">
            {/* <div className="carousel-fixed-item center">
                <a className="btn waves-effect white grey-text darken-text-2"></a>
            </div> */}
            <div style={{height: '45vh'}} className="carousel-item white-text" href="#one!">
                {cards}
            </div>
            <div style={{height: '45vh'}}  className="carousel-item white-text" href="#two!">
                {cards}
            </div>
            <div style={{height: '45vh'}}  className="carousel-item white-text" href="#three!">
                {cards}
            </div>
        </div>
    );
}

export default carousels;