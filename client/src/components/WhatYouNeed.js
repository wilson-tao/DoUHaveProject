import React, { Component } from 'react';
import NeedForm from './NeedForm';

class WhatYouNeed extends Component {
  render() {
    let isAuth = this.props.isAuth;
    let firstName = this.props.firstName;
    let userName = this.props.userName;
    let userId = this.props.userId;
    let token = this.props.token;

    if (isAuth) {
      return (
        <div className="WhatYouNeed">
          <h1>Post What You Need</h1>
          <NeedForm userName={userName} firstName={firstName} userId={userId} token={token} />
        </div>
      )
    } else {
      return (
        <h3>Please Log In Above...</h3>
      )
    }

  }
}

export default WhatYouNeed;
