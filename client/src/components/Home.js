import React, { Component } from 'react';


import CatResults from './CatResults';
import WhatPeopleNeed from './WhatPeopleNeed';


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

    let isAuth = this.props.isAuth
    let userName = this.props.userName
    let firstName = this.props.firstName
    let userId = this.props.userId
    let token = this.props.token

    return (
      <div className="Home">




        <WhatPeopleNeed isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} token={token} />


      </div>
    );
  }
}

export default Home;
