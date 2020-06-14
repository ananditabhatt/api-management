import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout/Layout';
import Auth from './container/Auth/Auth'
import * as actionCreators from './store/actions/actionCreators';
import { connect } from "react-redux";
import ApiManagement from './container/ApiManagement/ApiManagement'

class App extends Component {
    render() {
        return (
            <div>
                {/* <Layout> */}
                    {this.props.isAuthenticated ?
                        <Switch>
                            <Route path='/landing' component={ApiManagement} />
                            <Route component={ApiManagement} />
                        </Switch> :
                        <Switch>
                            <Route path="/" exact component={Auth} />
                            <Route component={Auth} />
                        </Switch>}
                {/* </Layout> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        isAuthenticated: state.auth.token != null
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        onAuthCheckStatus: () => { dispatch(actionCreators.AC_Auth_CheckState()) }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
