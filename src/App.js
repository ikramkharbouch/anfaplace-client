import React from 'react';
import { Icon, Button, Segment, Label } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Segment>
        <p>Hello semantic-ui button with icon</p>
        <Button as="div" labelPosition="right">
          <Button color="red">
            <Icon name="heart" />
            Like
          </Button>
          <Label as="a" basic color="red" pointing="left">
            2,048
          </Label>
        </Button>
      </Segment>
    </div>
  );
}

export default App;
