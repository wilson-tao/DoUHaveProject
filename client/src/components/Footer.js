import React, { Component } from 'react';
import facebook from '../img/001-facebook-logo-button.svg';
import twitter from '../img/002-twitter.svg';
import youtube from '../img/003-youtube-logotype.svg';
import linkedin from '../img/004-linkedin-button.svg';
import instagram from '../img/instagram-logo.svg';
import Logo from '../img/Primary Logo- Off Black.png';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <hr />
        <div className="footer-links">
          <a href="/">Home</a>  | <a href="/About">About Us</a> | <a href="/Contact">Contact</a>
        </div>
        <div className="footer-container">
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/douhave" target="_blank"><img className="footer-icon" src={linkedin} alt="linkedin" /></a> <a href="https://www.facebook.com/DoUhave.co" target="_blank"><img className="footer-icon" src={facebook} alt="facebook" /></a> <a href="https://www.instagram.com/douhave.co/" target="_blank"><img className="footer-icon" src={instagram} alt="instagram" /></a> <a href="https://www.youtube.com/channel/UCjwi66Egr3vAgOvz33mpJwg" target="_blank"><img className="footer-icon" src={youtube} alt="youtube" /></a>
          </div>
          <div className="footer-logo">
             <img src={Logo} alt="doUhave.org" />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
