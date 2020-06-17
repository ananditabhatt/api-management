import React, { Component } from 'react';
import Header from '../components/Navigation/Header/Header';
import classes from './Layout.css';
import Aux from '../hoc/Aux';
import * as actionCreators from "../store/actions/actionCreators";
import { connect } from 'react-redux';
import Footer from '../components/Navigation/Footer/Footer';
import { Parallax, Background } from 'react-parallax';

class Layout extends Component {

    onSignUpWindow = () => {
        this.props.onSignUp()
    }

    render() {
        return (
            <Aux>
                <div style={{ display: 'block' }}>
                    <Header
                        isAuthenticated={this.props.isAuthenticated}
                        userId={this.props.userId}
                        email={this.props.email}
                        onSignUpWindow={this.onSignUpWindow}
                    />
                    <main>{this.props.children}</main>
                    {/* <Parallax className={classes.ParallaxContainer} strength={300}>
                        <div style={{ height: '60vh' }}>
                            <div class={classes.CurvedDiv}>
                                <svg viewBox="0 0 1440 319">
                                    <path fill="#194752ed" fill-opacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                </svg>
                            </div>
                            <Footer />
                        </div>
                        <Background className="custom-bg">
                            {/* <img src={img} alt="fill murray" /> */}
                        {/* </Background> */}
                    {/* </Parallax> */} 
                </div>
            </Aux>
        );
    }
}

const mapStateToProp = state => {
    return ({
        isAuthenticated: state.auth.token !== null,
        userId: state.auth.userId,
        email: state.auth.email
    });
}

const mapdispatchToProp = dispatch => {
    return ({
        onSignUp: () => dispatch(actionCreators.AC_SignUpwindow())
    });
}
export default connect(mapStateToProp, mapdispatchToProp)(Layout);