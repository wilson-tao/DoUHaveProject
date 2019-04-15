import React, { Component } from 'react';
import Login from './Login';
import Logo from '../img/DoUHaveLogoSmall.png';
import MobileLogin from './MobileLogin';


class Header extends Component {

  render() {
    let isAuth = this.props.isAuth;
    let userName = this.props.userName;
    let firstName = this.props.firstName;

    console.log('Passed Token Header:', isAuth);


    return (
      <div className="Header">

        <div className="site-title"><img src={Logo} alt="Logo" /></div>
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
