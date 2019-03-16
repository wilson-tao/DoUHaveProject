import React, { Component } from 'react';
import CatResults from './CatResults';

class Furniture extends Component {
  render() {
    return (
      <div className="Furniture">
        <h1>Furniture</h1>
        <CatResults category={'furniture'} />
      </div>
    );
  }
}

export default Furniture;
