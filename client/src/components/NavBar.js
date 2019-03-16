import React, { Component } from 'react';


class NavBar extends Component {
  render() {
    let navLinks = this.props.navLinks;

    return (
      <div className="NavBar">
        <ul>
          {navLinks.map((navLinks, index) =>
            <li key={index}><a href={navLinks.link}>{navLinks.label}</a></li>
          )}
        </ul>
      </div>
    );
  }
}

export default NavBar;
