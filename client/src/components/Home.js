import React, { Component } from 'react';

import Categories from './Categories';
import CatResults from './CatResults';


class Home extends Component {

  constructor (props) {
    super(props);

    this.state = {
      category: ''
    };

    this.changeCategory = this.changeCategory.bind(this);
  }

  changeCategory(cat) {
    this.setState({
      category: cat
    })
  }

  render() {
    const {
      category
    } = this.state;

    return (
      <div className="Home">



        <Categories />


      </div>
    );
  }
}

export default Home;
