import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import manageUsersReducer from './store/reducer/manageUsersReducer';
import rbacReducer from './store/reducer/rbacReducer';
import auth from './store/reducer/authReducer'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import  thunk  from 'redux-thunk'

const reducer = combineReducers({
    manageUsersReducer: manageUsersReducer,
    rbacReducer: rbacReducer,
    auth:auth
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
