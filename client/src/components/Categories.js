import React, { Component } from 'react';
import Category from './Category';

import Antiques from '../img/Antiques.png';
import Vintage from '../img/Vintage clothes and accessories.png';
import Collectibles from '../img/Collectibles.png';
import Vehicles from '../img/Rare & Custom Vehicles.png';
import VintageHome from '../img/Vintage Home.png';
import Other from '../img/Other.png';



class Categories extends Component {
  render() {

    let catLinks = [
      { label: 'Antiques', link: '/antiques', bg: Antiques },
	  { label: 'Vintage', link: '/vintage', bg: Vintage },
	  { label: 'Collectibles', link: '/collectibles', bg: Collectibles },
	  { label: 'Rare & Custom Vehicles', link: '/rarevehicles', bg: Vehicles },
	  { label: 'Vintage Home', link: '/vintageHome', bg: VintageHome },
	  { label: 'Other', link: '/other', bg: Other }
	  ];

    return (
      <div className="Categories">

        <Category catLinks={catLinks[0]} />
        <Category catLinks={catLinks[1]} />
        <Category catLinks={catLinks[2]} />
        <Category catLinks={catLinks[3]} />
        <Category catLinks={catLinks[4]} />
        <Category catLinks={catLinks[5]} />

      </div>
	  
    );
  }
}

export default Categories;
