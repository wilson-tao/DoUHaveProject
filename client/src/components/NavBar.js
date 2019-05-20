import React, { Component } from 'react';


class NavBar extends Component {
  render() {
    let navLinks = this.props.navLinks;

    return (
      <div className="NavBar">
        <ul>
          {navLinks.map((navLinks, index) =>
            <a key={index} href={navLinks.link}><li key={index}>{navLinks.label}</li></a>
          )}
        </ul>
      </div>
    );
  }
}

export default NavBar;
