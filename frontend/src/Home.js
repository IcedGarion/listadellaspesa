import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Link to="/lista" target="/lista"><Button color="link">Lista</Button></Link>
                </Container>
            </div>
        );
    }
}
export default Home;