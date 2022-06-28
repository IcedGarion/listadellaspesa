import logo from './logo.svg';
import './App.css';
import {Component} from "react";

class App extends Component {
  state = {
    lista: []
  };

  async componentDidMount() {
    const response = await fetch('/api/getList');
    const body = await response.json();
    this.setState({lista: body});
  }

  render() {
    const {lista} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Lista</h2>
              {lista.map(element =>
                  <div key={element.id}>
                    {element.nome} ({element.disponibile})
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}

export default App;