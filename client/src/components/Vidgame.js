import React, { Component } from 'react';
import CatResults from './CatResults';

class Vidgame extends Component {
  render() {
    return (
      <div className="Vidgame">
        <h1>Video Games</h1>
        <CatResults category={'game'} />
      </div>
    );
  }
}

export default Vidgame;
