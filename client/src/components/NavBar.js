import React, { Component } from 'react';
import MenuLine from '../img/thin-white-line-png-6.png';

class NavBar extends Component {
  render() {
    let navLinks = this.props.navLinks;

    return (
      <div className="NavBar">
	  <hr
        style={{
            backgroundColor: '#FFFFFF',
			width: '40%',
			marginTop: '30px',
            height: 1
        }} />
		<hr
        style={{
            backgroundColor: '#FFFFFF',
			width: '60%',
			marginTop: '10px',
            height: 1
        }} />
        <div className="NavBarItems">
          {navLinks.map((navLinks, index) =>
            <a key={index} href={navLinks.link}>{navLinks.label}</a>
          )}
        </div>
		 <hr
        style={{
            backgroundColor: '#FFFFFF',
			width: '60%',
			marginTop: '30px',
            height: 1
        }} />
		<hr
        style={{
            backgroundColor: '#FFFFFF',
			width: '40%',
			marginTop: '10px',
            height: 1
        }} />
      </div>
    );
  }
}

export default NavBar;
