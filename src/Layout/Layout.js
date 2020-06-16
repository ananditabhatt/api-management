import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Header from '../components/Navigation/Header/Header';
import Parallax from '../components/Parallax/Parallax';
import classes from './Layout.css';
import { connect } from 'react-redux';
import loginBackground from "../assets/Login.mp4";

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Header isAuthenticated={this.props.isAuthenticated} userId={this.props.userId} email={this.props.email} />
                {/* //<Parallax> */}
                <main>
                    {this.props.children}
                </main>
                
                {/* </Parallax> */}
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

export default connect(mapStateToProp)(Layout);