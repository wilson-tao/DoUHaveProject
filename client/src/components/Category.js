import React, { Component } from 'react';


class Category extends Component {
  render() {
    let catLinks = this.props.catLinks;

    return (
      <div className="category">
        <a href={catLinks.link}><div className="cat-title"><p>{catLinks.label}<br /></p></div><img src={catLinks.bg} alt={catLinks.label} /></a>
      </div>
    );
  }
}

export default Category;
