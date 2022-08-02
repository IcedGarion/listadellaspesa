import React, {Component} from 'react';
import {Button, Container, Nav, NavItem, NavLink, Table} from 'reactstrap';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';

class ElementList extends Component {

    constructor(props) {
        super(props);
        // questo state in teoria andrebbe preso dalla tabella categorie
        this.state = {lista: [], activeTab: 'cibo'};
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
            categoria: this.state.activeTab,
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

    selectTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const {lista, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const listaList = lista
            // sto filter va sistemato una volta che ci sara' la tabella categorie
            .filter(e => {
                if(this.state.activeTab === 'cibo')
                    return e.categoria.toLowerCase() === 'cibo';
                else
                    return e.categoria.toLowerCase() !== 'cibo';
            })
            .sort((a, b) => {
                if(a.categoria.toLowerCase() === b.categoria.toLowerCase()) {
                    if (a.nome === "") return 1;
                    return a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : -1;
                }
                else {
                    return a.categoria.toLowerCase() > b.categoria.toLowerCase() ? 1 : -1;
                }
            } )
            .map(element => {
            return <tr key={element.id}>
                <td><div contentEditable="true" onBlur={ e => this.editText(element.id, "nome", e.currentTarget.textContent) }>{element.nome}</div></td>
                <td><div contentEditable="true" onBlur={ e => this.editText(element.id, "dove", e.currentTarget.textContent) }>{element.dove}</div></td>
                <td hidden={this.state.activeTab === 'cibo'} ><div contentEditable="true" onBlur={ e => this.editText(element.id, "categoria", e.currentTarget.textContent) }>{element.categoria}</div></td>
                <td><div contentEditable="true" onBlur={ e => this.editText(element.id, "note", e.currentTarget.textContent) }>{element.note}</div></td>
                <td><div style={{display:"flex"}}><Button size="lg" style={{textAlign:"center",display:"block",margin:"auto", flex:"auto"}} color={element.disponibile === true ? "success" : "danger"} onClick={ e => this.editText(element.id, "disponibile", !element.disponibile)}></Button></div></td>
                <td><Button size="sm" color="dark" style={{textAlign:"center",display:"block",margin:"auto", flex:"auto"}} onClick={() => this.remove(element.id)}>-</Button></td>
            </tr>
        });

        return (
            <div style={{backgroundColor: '#111111'}}>
                <AppNavbar/>
                <Container fluid>
                    <div>
                        <br />
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'cibo' })}
                                    onClick={() => { this.selectTab('cibo'); }} >
                                    <h3 style={{color: '#aaaaaa'}}>CIBO</h3>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'altro' })}
                                    onClick={() => { this.selectTab('altro'); }} >
                                    <h3 style={{color: '#aaaaaa'}}>ALTRO</h3>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>

                    <Table dark striped bordered responsive size="sm">
                        <thead>
                        <tr>
                            <th width="19%"><h5>Nome</h5></th>
                            <th width="19%"><h5>Dove</h5></th>
                            <th hidden={this.state.activeTab === 'cibo'} width="10%"><h5>Tipo</h5></th>
                            <th width="19%"><h5>Note</h5></th>
                            <th width="19%"><h5>Manca</h5></th>
                            <th width="9%"></th>
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