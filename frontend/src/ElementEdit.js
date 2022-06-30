import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class ElementEdit extends Component {

    emptyItem = {
        nome: '',
        dove: '',
        categoria: '',
        note: '',
        disponibile: 'false'
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const element = await (await fetch(`/lista/${this.props.match.params.id}`)).json();
            this.setState({item: element});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch("/lista", {
            method: (item.id) ? 'PATCH' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });

        this.props.history.push('/lista');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Element' : 'Add Element'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Nome</Label>
                        <Input type="text" name="nome" id="nome" value={item.nome || ''}
                               onChange={this.handleChange} autoComplete="nome"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="dove">Dove</Label>
                        <Input type="text" name="dove" id="dove" value={item.dove || ''}
                               onChange={this.handleChange} autoComplete="dove"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="categoria">Categoria</Label>
                        <Input type="text" name="categoria" id="categoria" value={item.categoria || ''}
                               onChange={this.handleChange} autoComplete="categoria"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="note">Note</Label>
                        <Input type="text" name="note" id="note" value={item.note || ''}
                               onChange={this.handleChange} autoComplete="note"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="disponibile">Disponibile</Label>
                        <Input type="select" name="disponibile" id="disponibile" value={item.disponibile || ''}
                                     onChange={this.handleChange} autoComplete="disponibile">
                            <option value="false">false</option>
                            <option value="true">true</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" >Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/lista" target="/lista">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(ElementEdit);