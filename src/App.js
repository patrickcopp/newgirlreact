import React, { Component } from 'react';
import './style.css';

class Episode extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }

  render() {
    return(
      <div className="rcorners2">
        <div id="row">
          <div className="col1">{this.props.title}</div>
          <div className="col2">{this.props.time}</div>
        </div>
        <div id="row">
          <div className="script" >{this.props.script}</div>
        </div>
      </div>
    )
  };
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
    fetch('http://18.217.134.144/?quote='+this.state.quote)
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
              <form
                autoComplete="off"
                onSubmit={(e) => {this.doRequest(e); e.preventDefault();}}
                action="#"
              >
                <input
                  type="text"
                  id="search-terms-bar"
                  placeholder="SEARCH ANY QUOTE..."
                  value={this.state.quote}
                  onChange={e => this.updateInput("quote",e.target.value)}
                  >
                </input>
              </form>
            </div>
          </div>
        </div>
        <div style={{height: "15px", backgroundColor: "#cacaca"}}></div>
        <div id="body_wrapper">
            {this.state.episodes.map(this.renderTable)}
        </div>
        <div className="footer">
        © 2020 Patrick Copp | <a rel="noreferrer" href="https://github.com/patrickcopp/newgirlreact" target="_blank">Source Code</a>
        </div>
      </div>
  );
  }
}
export default App;
