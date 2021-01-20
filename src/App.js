import React, { Component } from 'react';
import * as ReactBootStrap from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './style.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      quote:"",
      episodes:[
      ]
    }
  }

  updateInput(key,value){
    this.setState({
      [key]: value
    })
  }

  doRequest = function(e){
    fetch('http://localhost:8000/?quote='+this.state.quote)
    .then(blob => blob.json())
    .then(data => {
      this.setState({
        "episodes": data
      })
    });
    e.target.querySelector('input').blur();
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
                onSubmit={(e) => {this.doRequest(e); e.preventDefault();}}
              >
                <input
                  id="search-terms-bar"
                  placeholder="SEARCH ANY QUOTE..."
                  value={this.state.quote}
                  onChange={e => this.updateInput("quote",e.target.value)}
                  >
                </input>
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
