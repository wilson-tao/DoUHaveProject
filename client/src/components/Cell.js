import React, { Component } from 'react';
import CatResults from './CatResults';

class Cell extends Component {
  render() {
    return (
      <div className="Cell">
        <h1>Cell Phones</h1>
        <CatResults category={'cell'} />
      </div>
    );
  }
}

export default Cell;
