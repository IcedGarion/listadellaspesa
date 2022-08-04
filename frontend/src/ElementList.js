import React, {Component} from 'react';
import {Button, Container, Nav, NavItem, NavLink, Table} from 'reactstrap';
import {isMobile} from 'react-device-detect';
import classnames from 'classnames';
import AppNavbar from './AppNavbar';

class ElementList extends Component {

    constructor(props) {
        super(props);
        // questo state in teoria andrebbe preso dalla tabella categorie
        this.state = {lista: [], activeTab: 'cibo', touchX: 0, toggleDelete: false};
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
            this.setState({toggleDelete: false})
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

    beginTouch(event) {
        this.setState({touchX: event.clientX})
    }

    endTouch(event) {
        if(Math.abs(this.state.touchX - event.clientX) > 75) {
            this.setState({touchX: 0});
            this.setState({toggleDelete: true});
        }
    }

    resetToggleDelete() {
        if(this.state.toggleDelete) {
            this.setState({toggleDelete: false});
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
            return <tr key={element.id} onMouseDown={ e => this.beginTouch(e)} onMouseUp={ e => this.endTouch(e) }>
                <td hidden={!this.state.toggleDelete}><Button size="sm" color="dark" style={{textAlign:"center",display:"block",margin:"auto", flex:"auto"}} onClick={() => this.remove(element.id)}>-</Button></td>
                <td><div contentEditable="true" onBlur={ e => this.editText(element.id, "nome", e.currentTarget.textContent) }>{element.nome}</div></td>
                <td><div contentEditable="true" onBlur={ e => this.editText(element.id, "dove", e.currentTarget.textContent) }>{element.dove}</div></td>
                <td hidden={this.state.activeTab === 'cibo'} ><div contentEditable="true" onBlur={ e => this.editText(element.id, "categoria", e.currentTarget.textContent) }>{element.categoria}</div></td>
                <td><div contentEditable="true" onBlur={ e => this.editText(element.id, "note", e.currentTarget.textContent) }>{element.note}</div></td>
                <td><div style={{display:"flex"}}><Button size="lg" style={{textAlign:"center",display:"block",margin:"auto", flex:"auto"}} color={element.disponibile === true ? "success" : "danger"} onClick={ e => this.editText(element.id, "disponibile", !element.disponibile)}></Button></div></td>
                <td hidden={isMobile}><Button size="sm" color="dark" style={{textAlign:"center",display:"block",margin:"auto", flex:"auto"}} onClick={() => this.remove(element.id)}>-</Button></td>
            </tr>
        });

        return (
            <div className='content' onMouseUp={() => this.resetToggleDelete() } onTouchEnd={() => this.resetToggleDelete()}>
                <AppNavbar/>
                <Container fluid>
                    <div>
                        <br />
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'cibo' })}
                                    onClick={() => { this.selectTab('cibo'); }} >
                                    <h3 style={{color: '#aaaaaa', fontFamily: 'fantasy'}}>CIBO</h3>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'altro' })}
                                    onClick={() => { this.selectTab('altro'); }} >
                                    <h3 style={{color: '#aaaaaa', fontFamily: 'fantasy'}}>ALTRO</h3>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>

                    <Table dark striped bordered responsive size="sm">
                        <thead>
                        <tr>
                            <th hidden={!this.state.toggleDelete} width={this.state.toggleDelete ? this.state.activeTab === 'cibo' ? "9%" : "8%" : "0%"}></th>
                            <th width={this.state.activeTab === 'cibo' ? "29%" : "25%"}><h5>Nome</h5></th>
                            <th width={this.state.activeTab === 'cibo' ? "24%" : "20%"}><h5>Dove</h5></th>
                            <th hidden={this.state.activeTab === 'cibo'} width="14%"><h5>Tipo</h5></th>
                            <th width={this.state.activeTab === 'cibo' ? "24%" : "21%"}><h5>Note</h5></th>
                            <th width={this.state.activeTab === 'cibo' ? "14%" : "12%"}><h5>Manca</h5></th>
                            <th hidden={isMobile} width={this.state.activeTab === 'cibo' ? "9%" : "8%"}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {listaList}
                        </tbody>
                    </Table>
                    <div className="float-right">
                        <Button style={{color: '#0dcaf0'}}  onClick={() => this.addNew()}>+</Button>
                    </div>
                    <br />
                </Container>
            </div>
        );
    }
}
export default ElementList;