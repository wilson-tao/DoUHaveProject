import React, { Component } from 'react';
import LoginImg from '../img/login.svg';
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
            <div className="mobile-login-box">
              <img className="mobile-login-img" src={LoginImg} alt="Login Image" onClick={this.onLoginIcon} />
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
            <div className="mobile-login-box">
              <p><a href="/userpanel">Welcome, {firstName}!</a></p>
              <a href="#" onClick={this.onLogout}>Logout</a><br />
            </div>
          ) : (null)
        }
      </div>
    );
  }
}

export default MobileLogin;
