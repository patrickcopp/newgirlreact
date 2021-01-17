import { render } from '@testing-library/react';
import React, { Component } from 'react';
import * as ReactBootStrap from "react-bootstrap";

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

  doRequest(){
    console.log(this.state)
    this.state.episodes = [];
    this.state.episodes.push({title:"yolo",script:"lmoa",time:"POGGERS"});
    this.forceUpdate();
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
        <div>
          <input
            type= "text"
            placeholder="Quote"
            value={this.state.quote}
            onChange={e => this.updateInput("quote",e.target.value)}
          />
          <button
            onClick={() => this.doRequest()}
          >Go</button>
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
