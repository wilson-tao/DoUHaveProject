import React, { Component } from 'react';
import CatResults from './CatResults';


class Auto extends Component {
  render() {
    return (
      <div className="Auto">
        <h1>Auto</h1>
        <CatResults category={'auto'} />
      </div>
    );
  }
}

export default Auto;
