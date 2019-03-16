import React, { Component } from 'react';
import CatResults from './CatResults';

class Instruments extends Component {
  render() {
    return (
      <div className="Instruments">
        <h1>Musical Instruments</h1>
        <CatResults category={'instrument'} />
      </div>
    );
  }
}

export default Instruments;
