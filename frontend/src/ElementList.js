import React, { Component } from 'react';
import { Button, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';

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

    async editText(elementId, attributeName, newAttributeValue) {
        let updatedElement = this.state.lista.filter(e => e.id === elementId)[0];
        updatedElement[attributeName] = newAttributeValue;
        let updatedLista = this.state.lista.filter(e => e.id !== elementId);
        updatedLista.push(updatedElement);

        this.setState({lista: updatedLista});

        await fetch("/lista", {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedElement),
        });
    }

    addNew() {
        const emptyItem = {
            id: null,
            nome: '',
            dove: '',
            categoria: '',
            note: '',
            disponibile: 'false'
        };

        fetch("/lista", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emptyItem),
        })
            .then(response => response.json())
            .then(newElement => {
                let listaPlusOne = this.state.lista;
                listaPlusOne.push(newElement);
                this.setState({lista: listaPlusOne});
            });
    }

    render() {
        const {lista, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const listaList = lista.sort((a, b) => {
            if(a.nome === "") return 1;
            return a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : -1
        } )
            .map(element => {
            return <tr key={element.id}>
                <td><div contentEditable="true" onBlur={ e => this.editText(element.id, "nome", e.currentTarget.textContent) }>{element.nome}</div></td>
                <td><div contentEditable="true" onBlur={ e => this.editText(element.id, "dove", e.currentTarget.textContent) }>{element.dove}</div></td>
                <td><div contentEditable="true" onBlur={ e => this.editText(element.id, "categoria", e.currentTarget.textContent) }>{element.categoria}</div></td>
                <td><div contentEditable="true" onBlur={ e => this.editText(element.id, "note", e.currentTarget.textContent) }>{element.note}</div></td>
                <td><Button size="lg" color={element.disponibile === true ? "success" : "danger"} onClick={ e => this.editText(element.id, "disponibile", !element.disponibile)}></Button></td>
                <td><Button size="sm" color="dark" onClick={() => this.remove(element.id)}>-</Button></td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Lista</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="19%">Nome</th>
                            <th width="19%">Dove</th>
                            <th width="19%">Categoria</th>
                            <th width="19%">Note</th>
                            <th width="19%">Disponibile</th>
                            <th width="5%"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {listaList}
                        </tbody>
                    </Table>
                    <div className="float-right">
                        <Button color="primary" onClick={() => this.addNew()}>+</Button>
                    </div>
                </Container>
            </div>
        );
    }
}
export default ElementList;