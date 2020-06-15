import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout/Layout';
import Auth from './container/Auth/Auth'
import * as actionCreators from './store/actions/actionCreators';
import { connect } from "react-redux";
import ApiManagement from './container/ApiManagement/ApiManagement'
import logout from './container/Auth/Logout/Logout'
import Reset from './container/Auth/Reset/Reset';

class App extends Component {
    componentDidMount(){
        this.props.onAuthCheckStatus();
    }
    
    render() {
        return (
            <div>
                <Layout>
                    {this.props.isAuthenticated ?
                        <Switch>
                            <Route path='/landing' component={ApiManagement} />
                            <Route path='/logout' component={logout} />
                            <Route component={ApiManagement} />
                        </Switch> :
                        <Switch>
                            <Route path='/logout' component={logout} />
                            <Route path='/ResetPassword' component={Reset} />
                            <Route path="/" exact component={Auth} />
                            <Route component={ApiManagement} />
                        </Switch>}
                </Layout>
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
