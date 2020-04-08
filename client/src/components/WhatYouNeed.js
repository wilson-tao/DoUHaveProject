import React, { Component } from 'react';
import NeedForm from './NeedForm';

class WhatYouNeed extends Component {
  render() {
    let isAuth = this.props.isAuth;
    let firstName = this.props.firstName;
    let userName = this.props.userName;
    let userId = this.props.userId;
    let token = this.props.token;
    let email = this.props.email;

    if (isAuth) {
      return (
        <div className="WhatYouNeed">
			<div className="WhatYouNeedHeaders">
          <h1>WHAT ARE YOU LOOKING FOR?</h1>
		  <h3 style={{
            fontWeight:'400',
			color:'#A9A9A9'
        }}>Create a post listing the item you're in search of.</h3>
		<hr style={{
            backgroundColor:'#000000',
			width: '65%',
			marginBottom: '0.5rem'
        }} />
		<hr style={{
			backgroundColor:'#000000',
			width: '50%',
			marginTop: '0rem'
        }} />
		</div>
          <NeedForm email={email} userName={userName} firstName={firstName} userId={userId} token={token} />
		  
        </div>
      )
    } else {
      return (
        <h3 style={{textAlign: 'center'}}>Please Log In Above...</h3>
      )
    }

  }
}

export default WhatYouNeed;
