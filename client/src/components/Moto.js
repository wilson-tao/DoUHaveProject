import React, { Component } from 'react';
import CatResults from './CatResults';

class Moto extends Component {
  render() {
    return (
      <div className="Moto">
        <h1>Motorcycles, ATVs, and UTVs</h1>
        <CatResults category={'moto'} />
      </div>
    );
  }
}

export default Moto;
