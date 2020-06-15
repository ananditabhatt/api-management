import React, { Component } from 'react';
import * as actionCreators from '../../../store/actions/actionCreators';
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import classes from './Logout.css';
import Aux from '../../../hoc/Aux';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout()

    }
    render() {
        return (
            <Aux>
                <div className={classes.Logout}>
                    <h4>You have Successfully logged Out!!</h4>
                    <br /><br />
                    <NavLink to="/" style={{ color: "black", fontSize: "bold" }}>Click here to Login!</NavLink>
                </div>
            </Aux>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(actionCreators.AC_authLogout()) }
    }
}

export default connect(null, mapDispatchToProps)(Logout);