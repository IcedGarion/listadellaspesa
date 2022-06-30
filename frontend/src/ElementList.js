import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ElementList extends Component {

    constructor(props) {
        super(props);
        this.state = {lista: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/lista')
            .then(response => response.json())
            .then(data => this.setState({lista: data}));
    }

    async remove(id) {
        await fetch(`/lista/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedElements = [...this.state.lista].filter(i => i.id !== id);
            this.setState({lista: updatedElements});
        });
    }

    render() {
        const {lista, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const listaList = lista.map(element => {
            return <tr key={element.id}>
                <td style={{whiteSpace: 'nowrap'}}>{element.nome}</td>
                <td>{element.dove}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/lista/" + element.id} >Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(element.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/lista/new">Add Element</Button>
                    </div>
                    <h3>Clients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Nome</th>
                            <th width="30%">Dove</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listaList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default ElementList;