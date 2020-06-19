import React, { Component } from 'react';
import Login from './Login';
import Logo from '../img/Primary Logo.jpg';
import PostButton from '../img/Button- Post It.png';
import MobileLogin from './MobileLogin';
import {Link} from 'react-router-dom'
class Header extends Component {
	
	 constructor(props) {
    super(props);

    this.state = {
          searchTerm: '',
      distance: '',
      zipCode: ''
   };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onDistanceChange = this.onDistanceChange.bind(this);
    this.onZipChange = this.onZipChange.bind(this);
    this.fetchZipInfo = this.fetchZipInfo.bind(this);
  }
onTextChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onDistanceChange(event) {
    this.setState({
      distance: event.target.value
    });
  }

  onZipChange(event) {
    this.setState({
      zipCode: event.target.value
    })
  }
  
  onSearch() {
    const {
      searchTerm,
      searchResults,
      showResults
    } = this.state;

    if(!showResults) {
      this.setState({
        showResults:true
      });
    }

    console.log("Search Term:", searchTerm);

    fetch('/items/search2/' + searchTerm, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log("Search Response:", json);
        if (json.count > 0) {
          this.setState({
            searchResults: json.items
          });
        }
      });

      this.fetchZipInfo();


  }

  fetchZipInfo() {
    const {
      zipCode,
      distance,
      zipResults
    } = this.state;

    if (zipCode !== '' && distance !== '') {
      fetch(`https://redline-redline-zipcode.p.rapidapi.com/rest/radius.json/${zipCode}/${distance}/mile`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'redline-redline-zipcode.p.rapidapi.com',
      		'x-rapidapi-key': '47eaf9b3eemsh8821c07d555b84cp11d76cjsn3879605d5b16'
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log("Zip Response", response);
        console.log(response.zip_codes);
        this.setState({
          zipResults: response.zip_codes
        });
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      console.log("No ZIP");
    }

  }
  render() {
    let isAuth = this.props.isAuth;
    let userName = this.props.userName;
    let firstName = this.props.firstName;
	const {
      
      searchTerm,
      
      distance,
      zipCode
     
    } = this.state;
		

    return (
      <div className="Header">

        <div className="site-title"><a href="/"><img src={Logo} alt="Logo" /></a></div>
		
		<div className="Search">
          

          <select className="searchHeight" name={distance} onChange={this.onDistanceChange}>
            <option value="">Miles</option>
            <option value="5">within 5 miles</option>
            <option value="10">within 10 miles</option>
            <option value="20">within 20 miles</option>
            <option value="60">within 60 miles</option>
          </select>
		  <span className="fromText">FROM</span>
		</div> 
		<div className="zipInput">
            <input type="text" style={{width: '85px'}} className="searchHeight" placeholder="Zip Code" value={zipCode} onChange={this.onZipChange} />
		</div>
           
		<div className="searchButtonHome">
		  <button style={{
			  backgroundColor:'#E4A62D',
				border:'none',
				fontWeight:'bolder'
				}} onClick={this.onSearch}>GO</button>
          </div>
        
		
		
       <div className="post-button-box">
			<a href="/WhatYouNeed">
				<img src={PostButton} alt="PostButton"/>
			</a>
		</div>
        <div className="login-box">
          <Login isAuth={isAuth} userName={userName} firstName={firstName} />
        </div>
		
        <div className="mobile-login">
          <MobileLogin isAuth={isAuth} userName={userName} firstName={firstName} />
		</div>
		
      </div>
    );
  }
}

export default Header;
