import React, { Component } from 'react';
import UserInfo from './UserInfo';
import UserOffers from './UserOffers';
import UserSaveList from './UserSaveList';

class UserPanel extends Component {




  render() {
    let isAuth = this.props.isAuth;
    let userId = this.props.userId;
    let token = this.props.token;

    if (isAuth) {

      return (
        <div className="UserPanel">


          <h1>User Panel</h1>

          <UserInfo userId={userId} token={token} />


        </div>
      );
    } else {
      return (
        <h1>Please Log In...</h1>
      );
    }

  }
}

export default UserPanel;
