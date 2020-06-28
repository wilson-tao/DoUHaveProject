import React, { Component } from 'react';
import LoginImg from '../img/Top Bar- Gold.png';
import Login from './Login';

import {
  getFromStorage,
  setInStorage,
  deleteFromStorage
} from '../util/storage';

class MobileLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showLogin: false
    }
    this.onLoginIcon = this.onLoginIcon.bind(this);
  }

  onLoginIcon = () => {
    const {showLogin} = this.state;
    if (!showLogin) {
      this.setState({
        showLogin: true
      })
    } else {
      this.setState({
        showLogin: false
      })
    }
  }

  onLogout() {
    deleteFromStorage();
  }

  render() {

    let isAuth = this.props.isAuth;
    let userName = this.props.userName;
    let firstName = this.props.firstName;

    return (
      <div className="MobileLogin">
        {
          (!isAuth) ? (
            <div style={{marginTop: '15px'}} className="mobile-login-box">
			<div className="signInText" onClick={this.onLoginIcon}>
              <img style={{
					width:1,
					height: 1,
					}} src={LoginImg} onClick={this.onLoginIcon} alt="SIGN IN"/><span
					style={{color: '#000000',
							fontWeight: '600'						
					}}>SIGN IN</span></div>
              {
                this.state.showLogin ? (
                  <div className="mobile-login-panel">
                    <Login isAuth={isAuth} userName={userName} firstName={firstName} />
                    <div className="mobile-login-exit" onClick={this.onLoginIcon}>
                      Exit
                    </div>
                  </div>
                ) : null
              }
            </div>
          ) : (null)
        }
        {
          (isAuth) ? (
            <div style={{marginTop: '5px'}} className="mobile-login-box">
              <p><a style={{fontWeight:'600', color:'#000000'}} href="/userpanel">Welcome, {firstName}!</a><br />
				<a style={{fontWeight:'600', color:'#000000'}} href="#" onClick={this.onLogout}>Logout</a>
			  </p>
              <br />
            </div>
          ) : (null)
        }
		<div className="registerText">
		<a style={{color: '#000000',
							fontWeight: '600'						
					}} href="/Register">SIGN UP</a><div className="space-break"></div></div>
      </div>
    );
  }
}

export default MobileLogin;
