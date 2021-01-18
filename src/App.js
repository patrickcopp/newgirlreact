import React, { Component } from 'react';
import * as ReactBootStrap from "react-bootstrap";
//import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      quote:"",
      episodes:[
        {title:"fuck",script:"XD",time:"dsaf"}
      ]
    }
  }

  updateInput(key,value){
    this.setState({
      [key]: value
    })
  }

  doRequest = function(){
    fetch('http://localhost:8000/?quote='+this.state.quote)
    .then(blob => blob.json())
    .then(data => {
      this.setState({
        "episodes": data
      })
    });
  }

  renderTable = (episode,index) => {
    return(
      <tr key={index}>
        <td>{episode.title}</td>
        <td>{episode.script}</td>
        <td>{episode.time}</td>
      </tr>
    )
  }

  render() {
    return (
      <div className="App">
        <div id="header_wrapper">
          <div id="header_inner">
            <div className="search-wrapper">
              <Form
                autoComplete="off"
                onSubmit={(e) => {this.doRequest(); e.preventDefault();}}
              >
                <Form.Group
                  id="search-terms-bar"
                  controlId="formBasicEmail"
                  value={this.state.quote}
                  onChange={e => this.updateInput("quote",e.target.value)}
                  >
                  <Form.Control placeholder="Search any quote..." />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
        <div>
          <ReactBootStrap.Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Script</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.episodes.map(this.renderTable)}
            </tbody>
          </ReactBootStrap.Table>
        </div>
      </div>
  );
  }
}
export default App;
