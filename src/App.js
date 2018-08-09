import React, { Component } from 'react';

import Nav from './Components/Nav.js';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {score:100};
  }	
  render() {
    return (
      <div className="container">
		<Nav score={this.state.score} />
      </div>
    );
  }
}

export default App;
