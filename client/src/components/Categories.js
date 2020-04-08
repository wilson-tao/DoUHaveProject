import React, { Component } from 'react';
import Category from './Category';

import autobg from '../img/svg/001-sedan-car-front.svg';
import appliancebg from '../img/svg/013-washing-machine.svg';
import cellbg from '../img/svg/006-cell-phone.svg';
import furniturebg from '../img/svg/014-couch.svg';
import instrumentbg from '../img/svg/016-treble-clef.svg';
import motobg from '../img/svg/007-motorcycle.svg';
import vidgamebg from '../img/svg/017-console.svg';
import beautybg from '../img/svg/022-lipstick.svg';
import homeservicebg from '../img/svg/025-customer-support.svg';
import clothingbg from '../img/svg/019-clothes.svg';
import miscbg from '../img/svg/020-sideboard.svg';
import autoservicebg from '../img/svg/024-car-repair.svg';
import collectiblesbg from '../img/svg/021-grandfather-clock.svg';
import comequipbg from '../img/svg/023-forklift-truck.svg';
import housingbg from '../img/svg/004-home.svg';
import packagebg from '../img/svg/005-gift.svg';



class Categories extends Component {
  render() {

    let catLinks = [
      { label: 'Cars & Trucks', link: '/auto', bg: autobg },
      { label: 'Appliances', link: '/appliances', bg: appliancebg },
      { label: 'Moto/ATV/UTV', link: '/moto', bg: motobg },
      { label: 'Cell Phones', link: '/cell', bg: cellbg },
      { label: 'Furniture', link: '/furniture', bg: furniturebg },
      { label: 'Musical Instruments', link: '/instruments', bg: instrumentbg },
      { label: 'Video Games', link: '/games', bg: vidgamebg },
      { label: 'Clothing, Apparel, & Accessories', link: '/clothing', bg: clothingbg },
      { label: 'Antiques & Collectibles', link: '/collectibles', bg: collectiblesbg },
      { label: 'Beauty', link: '/beauty', bg: beautybg },
      { label: 'Commercial & Restaurant Equipment', link: '/comequip', bg: comequipbg },
      { label: 'Everything Else', link: '/misc', bg: miscbg },
      { label: 'Housing & Places to Live', link: '/housing', bg: housingbg },
      { label: 'Auto Service', link: '/autoservice', bg: autoservicebg },
      { label: 'Home Service', link: '/homeservice', bg: homeservicebg },
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
        <Category catLinks={catLinks[9]} />
        <Category catLinks={catLinks[10]} />
        <Category catLinks={catLinks[11]} />
        <Category catLinks={catLinks[12]} />
        <Category catLinks={catLinks[13]} />
        <Category catLinks={catLinks[14]} />

		<hr style={{
            backgroundColor:'#000000',
			width: '90%',
			marginTop: '30px',
            border:'thin'
        }} />
		<hr style={{
			backgroundColor:'#000000',
            width: '60%',
			border:'thin'
        }} />

      </div>
	  
    );
  }
}

export default Categories;
