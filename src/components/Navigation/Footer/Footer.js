import React from 'react';
import classes from './Footer.css'
import { Divider } from '@material-ui/core';

const footer = () => (
    <footer >
        {/* <nav className={classes.DesktopOnly}> */}
        {/* <NavigationItems /> */}
        {/* </nav> */}

        <footer className={classes.Footer}>
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Telstra.com</h5>
                        <p className="grey-text text-lighten-4">Subscribe to us today!</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text"><u>Contact Us</u></h5>
                        <ul style={{display:'flex'}}>
                            <li><a href="https://www.linkedin.com/company/telstra/?originalSubdomain=au"><i className="fa fa-linkedin"></i></a></li>
                            <Divider style={{marginLeft:'5px', marginRight: '5px', backgroundColor:'white'}} orientation="vertical" flexItem />
                            <li><a href="https://www.youtube.com/user/TelstraCorp"><u>Telstra Corp©</u></a></li>
                            <Divider style={{marginLeft:'5px', marginRight: '5px', backgroundColor:'white'}} orientation="vertical" flexItem />
                            <li><a href="https://www.facebook.com/telstra"><i className="fa fa-facebook-square"></i></a></li>
                            <Divider style={{marginLeft:'5px', marginRight: '5px', backgroundColor:'white'}} orientation="vertical" flexItem />
                            <li><a  href="https://instagram.com/telstra/"><i className="fa fa-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    © 2020 Copyright. Terms and conditions privacy policy.
                </div>
            </div>
        </footer>
    </footer>
);

export default footer;