import React, { Component } from "react";
import Aux from "../Aux";
import Modal from "../../components/UI/Modal/Modal";


const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null,
        }

        componentWillMount() {
            this.requestInt = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.responseInt = axios.interceptors.response.use(res => res, err => {
                this.setState({ error: err });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInt);
            axios.interceptors.response.eject(this.responseInt);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        <span><i style={{ color: 'red' }} className="medium material-icons">error</i></span>
                        <span>{this.state.error ? this.state.error.message : null}</span>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        };
    }
}

export default withErrorHandler;