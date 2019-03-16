import React, { Component } from 'react';
import CatResults from './CatResults';


class WhatPeopleNeed extends Component {

  constructor (props) {
    super(props);

    this.state = {
      category: ''
    };

    //this.changeCategory = this.changeCategory.bind(this);
  }



  render() {
    const {
      category
    } = this.state;


    return (
      <div className="WhatPeopleNeed">



        <CatResults category={category} />

      </div>
    );
  }
}

export default WhatPeopleNeed;
