import React, { Component } from 'react';

import Nav from './Components/Nav.js';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {title:"Study Buddy", score:100};
  }	
  render() {
    return (
      <div className="container">
		<Nav title={this.state.title} score={this.state.score} />
      </div>
    );
  }
}

export default App;
