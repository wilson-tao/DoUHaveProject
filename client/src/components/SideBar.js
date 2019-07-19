import React, { Component } from 'react';
import NavBar from './NavBar';

import facebook from '../img/001-facebook-logo-button.svg';
import twitter from '../img/002-twitter.svg';
import youtube from '../img/003-youtube-logotype.svg';
import linkedin from '../img/004-linkedin-button.svg';
import instagram from '../img/instagram-logo.svg';


class SideBar extends Component {
  render() {

    let navLinks = [
      { label: 'Home', link: '/' },
      { label: 'What People Need', link: '/WhatPeopleNeed' },
      { label: 'What You Need', link: '/WhatYouNeed' },
      { label: 'How It Works', link: '/HowItWorks' },
      { label: 'About Us', link: '/About' },
      { label: 'Contact', link: '/Contact'}
    ];

    return (
      <div className="SideBar">
        <NavBar navLinks={navLinks} />
        <div className="footer-social">
          <a href="https://www.linkedin.com/company/douhave" target="_blank"><img className="footer-icon" src={linkedin} alt="linkedin" /></a> <a href="https://www.facebook.com/DoUhave.org/" target="_blank"><img className="footer-icon" src={facebook} alt="facebook" /></a> <a href="https://www.instagram.com/douhave_org/" target="_blank"><img className="footer-icon" src={instagram} alt="instagram" /></a> <a href="https://www.youtube.com/channel/UCBC4APUkBKC1lSysKRRoc6A" target="_blank"><img className="footer-icon" src={youtube} alt="youtube" /></a>
        </div>
      </div>
    );
  }
}

export default SideBar;
