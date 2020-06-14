import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Header from '../components/Navigation/Header/Header';
import Footer from '../components/Navigation/Footer/Footer'
import Parallax from '../components/Parallax/Parallax';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Header />
                <main>
                    {this.props.children}
                </main>
                <Parallax />
                <Footer />
            </Aux>
        );
    }

}

export default Layout;