import React, { Component } from 'react';
import * as actionCreators from '../../../store/actions/actionCreators';
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import classes from './Logout.css';
import Aux from '../../../hoc/Aux';

class Logout extends Component {
    state={
        redirect:false
    }

    componentDidMount() {
        this.props.onLogout()
        this.setState({
            redirect:true
        })

    }
    render() {
        return (
            <Aux>
                {this.state.redirect?<Redirect to="/"/>:null}
            </Aux>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(actionCreators.AC_authLogout()) }
    }
}

export default connect(null, mapDispatchToProps)(Logout);