import { render } from '@testing-library/react';
import React, { Component } from 'react';
import * as ReactBootStrap from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './style.css';

class Episode extends Component {
  constructor(props){
    super(props);
    this.state={
      rotation:false
    }
  }

  render() {
    return(
      <div className="rcorners2" id="row">
        <div className="col">{this.props.title}</div>
        <div className="col2">{this.props.time}</div>
        <div className="col3">
          <div className={this.state.rotation ? "rotate":""}>
            <span
              onClick={(e) => {this.arrowClick();}}
              className="dropdown_arrow"
             >
             </span>
          </div>   
        </div>
      </div>
    )
  };
  arrowClick()
  {
    this.setState({rotation:!this.state.rotation});
  }
}

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
      <Episode key={index} title={episode.title} time={episode.time} script={episode.script}/>
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
            {this.state.episodes.map(this.renderTable)}
        </div>
      </div>
  );
  }
}
export default App;
