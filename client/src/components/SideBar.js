import React, { Component } from 'react';
import NavBar from './NavBar';


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
      </div>
    );
  }
}

export default SideBar;
