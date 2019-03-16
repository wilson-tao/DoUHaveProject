import React, { Component } from 'react';
import facebook from '../img/001-facebook-logo-button.svg';
import twitter from '../img/002-twitter.svg';
import youtube from '../img/003-youtube-logotype.svg';
import linkedin from '../img/004-linkedin-button.svg';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <hr />
        <div className="footer-links">
          <a href="/">Home</a> | <a href="/HowItWorks">How It Works</a> | <a href="/About">About Us</a> | <a href="/Contact">Contact</a>
        </div>
        <div className="footer-container">
          <div className="footer-social">
            <img className="footer-icon" src={linkedin} alt="linkedin" /> <img className="footer-icon" src={facebook} alt="facebook" /> <img className="footer-icon" src={twitter} alt="twitter" /> <img className="footer-icon" src={youtube} alt="youtube" />
          </div>
          <div className="footer-logo">
             <h2>doUhave.org</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
