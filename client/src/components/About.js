import React, { Component } from 'react';
import logo from '../img/LogoWbg.png';


class About extends Component {
  render() {
    return (
      <div className="About">
        <h1>About</h1>
        <img className="logowbg" src={logo} alt="DoUHaveLogo" />
        <h3>The Ethics Company -2018-</h3>
        <label>Director of IT:</label><p>Umair Shahbaz</p>
        <label>Developer & Analytics:</label><p>Regan Lussier</p>
        <label>Co-Advisor:</label><p>Airion Watkins-Clark</p>
        <label>Chief Executive Officer:</label><p>Dave Nguyen</p>

      </div>
    );
  }
}

export default About;
