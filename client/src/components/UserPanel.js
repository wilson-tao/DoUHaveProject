import React, { Component } from 'react';
import UserInfo from './UserInfo';
import UserOffers from './UserOffers';
import UserSaveList from './UserSaveList';
import UserItems from './UserItems';


class UserPanel extends Component {




  render() {
    let isAuth = this.props.isAuth;
    let userId = this.props.userId;
    let token = this.props.token;
	 let firstName = this.props.firstName;
	 
    if (isAuth) {

      return (
        <div style={{textAlign:'center', marginLeft:'300px'}} className="UserPanel">
		  <UserInfo userId={userId} token={token} />
          <hr />
          <h2>Items You Posted</h2>
          <UserItems userId={userId} token={token} />
          <h2>Items You Saved</h2>
          <UserSaveList userId={userId} token={token} />
          

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
