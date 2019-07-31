import React, { Component } from 'react';
import CatResults from './CatResults';


class WhatPeopleNeed extends Component {

  constructor (props) {
    super(props);

    this.state = {
      category: '',
    };

    //this.changeCategory = this.changeCategory.bind(this);
  }



  render() {

    const {
      category
    } = this.state;

    let isAuth = this.props.isAuth;
    let userName = this.props.userName;
    let firstName = this.props.firstName;
    let userId = this.props.userId;
    let token = this.props.token;



    return (
      <div className="WhatPeopleNeed">


        <CatResults category={category} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} token={token} />

      </div>
    );
  }
}

export default WhatPeopleNeed;
