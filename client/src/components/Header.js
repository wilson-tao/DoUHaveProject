import React, { Component } from 'react';
import Login from './Login';
import Logo from '../img/DoUHaveLogoSmall.png';
import MobileLogin from './MobileLogin';


class Header extends Component {

  render() {
    let isAuth = this.props.isAuth;
    let userName = this.props.userName;
    let firstName = this.props.firstName;


    return (
      <div className="Header">

        <div className="site-title"><a href="/"><img src={Logo} alt="Logo" /></a></div>
        <div className="post-button-box"><a href="/WhatYouNeed"><button>Post What You Need</button></a></div>
        <div className="login-box">
          <Login isAuth={isAuth} userName={userName} firstName={firstName} />
        </div>
        <div className="mobile-login">
          <MobileLogin isAuth={isAuth} userName={userName} firstName={firstName} />
        </div>

      </div>
    );
  }
}

export default Header;
