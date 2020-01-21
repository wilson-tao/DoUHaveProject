import React, { Component } from 'react';


class Category extends Component {
  render() {
    let catLinks = this.props.catLinks;

    return (
      <div className="category">
        <a href={catLinks.link}><img src={catLinks.bg} alt={catLinks.label} /><div className="cat-title"><p>{catLinks.label}</p></div></a>
      </div>
    );
  }
}

export default Category;
