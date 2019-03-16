import React, { Component } from 'react';
import Category from './Category';

import autobg from '../img/autobg.jpg';
import appliancebg from '../img/appliancebg.jpg';
import cellbg from '../img/cellbg.jpg';
import furniturebg from '../img/furniturebg.jpg';
import instrumentbg from '../img/instrumentbg.jpg';
import motobg from '../img/motobg.jpg';
import vidgamebg from '../img/vidgamebg.jpg';
import beautybg from '../img/beautybg.jpg';
import packagebg from '../img/packagebg.jpg';



class Categories extends Component {
  render() {

    let catLinks = [
      { label: 'Cars and Trucks', link: '/auto', bg: autobg },
      { label: 'Appliances', link: '/appliances', bg: appliancebg },
      { label: 'Moto/ATV/UTV', link: '/moto', bg: motobg },
      { label: 'Cell Phones', link: '/cell', bg: cellbg },
      { label: 'Furniture', link: '/furniture', bg: furniturebg },
      { label: 'Musical Instruments', link: '/instruments', bg: instrumentbg },
      { label: 'Video Games', link: '/games', bg: vidgamebg },
      { label: 'Beauty', link: '/beauty', bg: beautybg },
      { label: 'Package Deals', link: '/packagedeals', bg: packagebg}
    ];

    return (
      <div className="Categories">
        
        <Category catLinks={catLinks[0]} />
        <Category catLinks={catLinks[1]} />
        <Category catLinks={catLinks[2]} />
        <Category catLinks={catLinks[3]} />
        <Category catLinks={catLinks[4]} />
        <Category catLinks={catLinks[5]} />
        <Category catLinks={catLinks[6]} />
        <Category catLinks={catLinks[7]} />
        <Category catLinks={catLinks[8]} />


      </div>
    );
  }
}

export default Categories;
