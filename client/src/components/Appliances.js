import React, { Component } from 'react';
import CatResults from './CatResults';


class Appliances extends Component {
  render() {
    return (
      <div className="Appliances">
        <h1>Appliances</h1>
        <CatResults category={'appliance'} />
      </div>
    );
  }
}

export default Appliances;
