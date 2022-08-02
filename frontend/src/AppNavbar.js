import React, {Component} from 'react';
import {Navbar} from 'reactstrap';
import logo from './header-logo.png'

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <div color="dark">
            <div className="header"><img src={logo} alt="" width={50} className="img"/></div>
        </div>;
    }
}