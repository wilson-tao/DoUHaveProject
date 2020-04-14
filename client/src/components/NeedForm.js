import React, { Component } from 'react';

import PostButton from '../img/Button- Post It.png';
import UploadPhotoButton from '../img/Button-Upload-Photo.png';


class NeedForm extends Component {

  constructor (props) {
    super(props);
    let firstName = this.props.firstName;
    let userName = this.props.userName;
    let userId = this.props.userId;
    let token = this.props.token;
    let email = this.props.email;

    this.state = {
      submitError: '',
      name: '',
      itemImg: null,
      budget: '',
      category: '',
      condition: '',
      description: '',
      location: '',
      locationState: '',
      locationZip: '',
      submittedby: firstName,
      submittedby1: userId,
      carmake: '',
      carmodel: '',
      caryear: '',
      cellmake: '',
      cellmodel: '',
      cellcarrier: '',
      cellos: '',
      gamesystem: '',
      contactinfo: email,
      phone: '',
      locationFetch: ''
    };
    this.onTextChangeName = this.onTextChangeName.bind(this);
    this.onChangeItemImg = this.onChangeItemImg.bind(this);
    this.onTextChangeBudget = this.onTextChangeBudget.bind(this);
    this.onTextChangeCategory = this.onTextChangeCategory.bind(this);
    this.onTextChangeCondition = this.onTextChangeCondition.bind(this);
    this.onTextChangeDescription = this.onTextChangeDescription.bind(this);
    this.onTextChangeLocation = this.onTextChangeLocation.bind(this);
    this.onTextChangeLocationState = this.onTextChangeLocationState.bind(this);
    this.onTextChangeLocationZip = this.onTextChangeLocationZip.bind(this);
    this.onTextChangeSubmittedby = this.onTextChangeSubmittedby.bind(this);

    this.onTextChangeCarmake = this.onTextChangeCarmake.bind(this);
    this.onTextChangeCarmodel = this.onTextChangeCarmodel.bind(this);
    this.onTextChangeCaryear = this.onTextChangeCaryear.bind(this);
    this.onTextChangeCellmake = this.onTextChangeCellmake.bind(this);
    this.onTextChangeCellmodel = this.onTextChangeCellmodel.bind(this);
    this.onTextChangeCellcarrier = this.onTextChangeCellcarrier.bind(this);
    this.onTextChangeCellos = this.onTextChangeCellos.bind(this);
    this.onTextChangeGamesystem = this.onTextChangeGamesystem.bind(this);
    this.onTextChangeContactInfo = this.onTextChangeContactInfo.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.callZipInfo = this.callZipInfo.bind(this);
    this.callZipInfo2 = this.callZipInfo2.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  onTextChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }
  onChangeItemImg(event) {
    this.setState({
      itemImg: event.target.files[0]
    });
  }
  onTextChangeBudget(event) {
    this.setState({
      budget: event.target.value
    });
  }
  onTextChangeCategory(event) {
    this.setState({
      category: event.target.value
    });
  }
  onTextChangeCondition(event) {
    this.setState({
      condition: event.target.value
    });
  }
  onTextChangeDescription(event) {
    this.setState({
      description: event.target.value
    });
  }
  onTextChangeLocation(event) {
    this.setState({
      location: event.target.value
    });
  }
  onTextChangeLocationState(event) {
    this.setState({
      locationState: event.target.value
    });
  }
  onTextChangeLocationZip(event) {
    this.setState({
      locationZip: event.target.value
    });
  }
  onTextChangeSubmittedby(event) {
    this.setState({
      submittedby: event.target.value
    });
  }
  onTextChangeCarmake(event) {
    this.setState({
      carmake: event.target.value
    });
  }
  onTextChangeCarmodel(event) {
    this.setState({
      carmodel: event.target.value
    });
  }
  onTextChangeCaryear(event) {
    this.setState({
      caryear: event.target.value
    });
  }
  onTextChangeCellmake(event) {
    this.setState({
      cellmake: event.target.value
    });
  }
  onTextChangeCellmodel(event) {
    this.setState({
      cellmodel: event.target.value
    });
  }
  onTextChangeCellcarrier(event) {
    this.setState({
      cellcarrier: event.target.value
    });
  }
  onTextChangeCellos(event) {
    this.setState({
      cellos: event.target.value
    });
  }
  onTextChangeGamesystem(event) {
    this.setState({
      gamesystem: event.target.value
    });
  }
  onTextChangeContactInfo(event) {
    this.setState({
      contactinfo: event.target.value
    });
  }
  onChangePhone(event) {
    this.setState({
      phone: event.target.value
    });
  }

  callZipInfo() {
    const {
      location,
      locationZip,
      locationState,
    } = this.state;

    fetch('/zips/' + locationZip, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if (json.response) {
        this.setState({
          locationFetch: json.response,
          locationZip: json.zip_code,
          locationState: json.state,
          locationCity: json.city
        });
      } else {
        console.log('Zip Lookup Did Not Work');
        console.log(json.error);
      }
    })
  }

  callZipInfo2() {
    const {
      location,
      locationZip,
      locationState,
    } = this.state;

    var isnum = /^\d+$/.test(locationZip);

    if (locationZip === '') {
      this.setState({
        submitError: 'Please Include Zip'
      });
      return
    } else if (locationZip.length !== 5) {
      this.setState({
        submitError: 'Invalid Zip'
      });
      return
    } else if (!isnum) {
      this.setState({
        submitError: 'Invalid Zip'
      });
      return
    } else {
      this.setState({
        submitError: ''
      });
    }


    return fetch(`https://redline-redline-zipcode.p.rapidapi.com/rest/info.json/${locationZip}/degrees`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'redline-redline-zipcode.p.rapidapi.com',
    		'x-rapidapi-key': '47eaf9b3eemsh8821c07d555b84cp11d76cjsn3879605d5b16'
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      console.log(response.city);
      console.log(response.state);
      this.setState({
        location: response.city,
        locationState: response.state
      });
    })
    .catch(err => {
      console.log(err);
    })
  }


  onSubmit2() {
    const {
      submitError,
      name,
      itemImg,
      budget,
      category,
      condition,
      description,
      location,
      locationState,
      locationZip,
      submittedby,
      submittedby1,
      carmake,
      carmodel,
      caryear,
      cellmake,
      cellmodel,
      cellcarrier,
      cellos,
      gamesystem,
      contactinfo,
      locationFetch
    } = this.state;

    let token = this.props.token;

    var data = new FormData();
    data.append('name', name);
    if (itemImg) {
      data.append('itemImg', itemImg);
    }
    data.append('budget', budget);
    data.append('category', category);
    data.append('condition', condition);
    data.append('description', description);
    data.append('location', location);
    data.append('locationState', locationState);
    data.append('locationZip', locationZip);
    data.append('submittedby', submittedby);
    data.append('submittedby1', submittedby1);
    data.append('carmake', carmake);
    data.append('carmodel', carmodel);
    data.append('caryear', caryear);
    data.append('cellmake', cellmake);
    data.append('cellmodel', cellmodel);
    data.append('cellcarrier', cellcarrier);
    data.append('cellos', cellos);
    data.append('gamesystem', gamesystem);
    data.append('contactinfo', contactinfo);

    console.log('Data: ', itemImg);

    if (itemImg) {
      fetch('/items', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: data,
      }).then(res => res.json())
      .then(json => {
        console.log(json.message);
        if (json.message === "Item created in /items") {
          console.log('it worked');
          this.setState({
            submitError: json.message,
            name: '',
            itemImg: '',
            budget: '',
            category: '',
            condition: '',
            description: '',
            location: '',
            locationState: '',
            locationZip: '',
            submittedby: '',
            submittedby1: '',
            carmake: '',
            carmodel: '',
            caryear: '',
            cellmake: '',
            cellmodel: '',
            cellcarrier: '',
            cellos: '',
            gamesystem: ''
          });
        } else {
          this.setState({
            submitError: json.error.message
          });
        }
      });
    } else {
      fetch('/items/nopic', {
        method: 'POST',
        body: data,
      }).then(res => res.json())
      .then(json => {
        console.log(json.message);
        if (json.message === "Item created in /items") {
          console.log('it worked');
          this.setState({
            submitError: json.message,
            name: '',
            itemImg: '',
            budget: '',
            category: '',
            condition: '',
            description: '',
            location: '',
            locationState: '',
            locationZip: '',
            submittedby: '',
            submittedby1: '',
            carmake: '',
            carmodel: '',
            caryear: '',
            cellmake: '',
            cellmodel: '',
            cellcarrier: '',
            cellos: '',
            gamesystem: ''
          });
        } else {
          this.setState({
            submitError: json.message
          });
        }
      });
    }

  }

  validateForm() {
    const {
      name,
      itemImg,
      budget,
      category,
      condition,
      description,
      location,
      locationState,
      locationZip,
      submittedby,
      submitError,
      contactinfo
    } = this.state;

    var isnum = /^\d+$/.test(locationZip);

    if (name === '') {
      this.setState({
        submitError: 'Item Name Cannot Be Empty'
      });
      return
    } else if (itemImg == null) {
      this.setState({
        submitError: 'Please Include Image'
      });
      return
    } else if (category === '') {
      this.setState({
        submitError: 'Please Choose a Category'
      });
      return
    } else if (budget === '') {
      this.setState({
        submitError: 'Budget Cannot Be Empty'
      });
      return
    } else if (isNaN(budget)) {
      this.setState({
        submitError: 'Please Include Only Numbers in Budget'
      });
      return
    } else if (condition === '') {
      this.setState({
        submitError: 'Please Choose a Condition'
      });
      return
    } else if (description === '') {
      this.setState({
        submitError: 'Description Cannot be Empty'
      });
      return
    } else if (description.length < 20) {
      this.setState({
        submitError: 'Description Needs to be at least 20 characters'
      });
      return
    } else if (locationZip === '') {
      this.setState({
        submitError: 'Please Include Zip'
      });
      return
    } else if (locationZip.length !== 5) {
      this.setState({
        submitError: 'Invalid Zip'
      });
      return
    } else if (!isnum) {
      this.setState({
        submitError: 'Invalid Zip'
      });
      return
    } else if (location === ''){
      this.setState({
        submitError: 'Please Include City where Item is Located'
      });
      return
    } else if (locationState === '') {
      this.setState({
        submitError: 'Please Choose a State'
      });
      return
    } else if (submittedby === '') {
      this.setState({
        submitError: 'Please Include Your Name'
      });
      return
    } else if (contactinfo === '') {
      this.setState({
        submitError: 'Please Include a Contact Number or Email Address'
      });
      return
    } else {

      this.onSubmit()
    }
  }

  onSubmit() {

    const {
      submitError,
      name,
      itemImg,
      budget,
      category,
      condition,
      description,
      location,
      locationState,
      locationZip,
      submittedby,
      submittedby1,
      carmake,
      carmodel,
      caryear,
      cellmake,
      cellmodel,
      cellcarrier,
      cellos,
      gamesystem,
      contactinfo
    } = this.state;

    let token = this.props.token;

    var data = new FormData();
    data.append('name', name);
    data.append('itemImg', itemImg);
    data.append('budget', budget);
    data.append('category', category);
    data.append('condition', condition);
    data.append('description', description);
    data.append('location', location);
    data.append('locationState', locationState);
    data.append('locationZip', locationZip);
    data.append('submittedby', submittedby);
    data.append('submittedby1', submittedby1);
    data.append('carmake', carmake);
    data.append('carmodel', carmodel);
    data.append('caryear', caryear);
    data.append('cellmake', cellmake);
    data.append('cellmodel', cellmodel);
    data.append('cellcarrier', cellcarrier);
    data.append('cellos', cellos);
    data.append('gamesystem', gamesystem);
    data.append('contactinfo', contactinfo);

    console.log('Data: ', itemImg);

    fetch('/items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data,
    }).then(res => res.json())
    .then(json => {
      console.log(json.message);
      if (json.message === "Item created in /items") {
        console.log('it worked');
        this.setState({
          submitError: json.message,
          name: '',
          itemImg: '',
          budget: '',
          category: '',
          condition: '',
          description: '',
          location: '',
          locationState: '',
          locationZip: '',
          submittedby: '',
          submittedby1: '',
          carmake: '',
          carmodel: '',
          caryear: '',
          cellmake: '',
          cellmodel: '',
          cellcarrier: '',
          cellos: '',
          gamesystem: ''
        });
      } else {
        this.setState({
          submitError: json.error.message
        });
      }
    });


  }

  render() {
    const {
      submitError,
      name,
      itemImg,
      budget,
      category,
      condition,
      description,
      location,
      locationState,
      locationZip,
      submittedby,
      submittedby1,
      carmake,
      carmodel,
      caryear,
      cellmake,
      cellmodel,
      cellcarrier,
      cellos,
      gamesystem,
      contactinfo,
      phone
    } = this.state;


    let firstName = this.props.firstName;
    let userName = this.props.userName;
    let userId = this.props.userId;
    let email = this.props.email;




    return (
	
      <div className="NeedForm">
		<div className="FormElements"> 
        <input type="hidden" value={submittedby1} />
        <div id="itemName">
          <label style={{fontWeight:'600'}}>ITEM NAME*</label><br />
          <input style={{backgroundColor: '#F9F3EA',
		  borderRadius: '0px'
		  }} type="text" value={name} onChange={this.onTextChangeName} required /><br />
        </div>
        <div style={{paddingTop: '10px'}} id="itemImgSection">
		<label style={{margin:'0px'}} for="itemImg" class="btn">
			<img style={{width:'100px', height:'40px', marginLeft:'-10px'}} src={UploadPhotoButton}/>
		</label>
          <input type="file" style={{visibility:'hidden'}} name="itemImg" id="itemImg" onChange={this.onChangeItemImg}  />
          <p style={{marginTop:'0px'}}>*required (choose a photo that best represents what you are looking for)</p>
        </div>
        <div className="itemRow">
          <div id="itemCategory">
            <label style={{fontWeight:'600'}}>Category</label><br />
            <select style={{height:'30px', backgroundColor: '#F9F3EA'}} required name={category} onChange={this.onTextChangeCategory}>
              <option value=""></option>
              <option value="auto">Car's and Trucks</option>
              <option value="appliance">Appliances</option>
              <option value="moto">Moto/ATV/UTV</option>
              <option value="cell">Cell Phones</option>
              <option value="furniture">Furniture</option>
              <option value="instrument">Musical Instruments</option>
              <option value="game">Video Games</option>
              <option value="clothing">Clothing & Accessories</option>
              <option value="collectible">Antiques & Collectibles</option>
              <option value="beauty">Beauty & Cosmetics</option>
              <option value="comequip">Commercial & Restaurant Equipment</option>
              <option value="misc">Everything Else</option>
              <option value="housing">Housing & Places to Live</option>
              <option value="autoservice">Auto Services</option>
              <option value="homeservice">Home Services</option>

            </select><br />
          </div>
          <div id="itemBudget">
            <label style={{fontWeight:'600'}}>Budget</label><br />
            $<input style={{borderRadius:'0px', height:'30px', backgroundColor: '#F9F3EA'}} required type="text" value={budget} onChange={this.onTextChangeBudget} /><br />
          </div>
         </div>
		 <div id="itemCondition">
            <label>Condition</label><br />
            <select style={{backgroundColor: '#F9F3EA'}} required name={condition} onChange={this.onTextChangeCondition}>
              <option value=""></option>
              <option value="new">New</option>
              <option value="likeNew">Like New</option>
              <option value="lightlyUsed">Lightly Used</option>
              <option value="used">Used</option>
              <option value="wellUsed">Well Used</option>
              <option value="needRepair">Needs Some Repair</option>
              <option value="parts">Parts</option>
            </select><br />
          </div>
		  <div>
        <label style={{fontWeight:'600'}}>DESCRIPTION</label><br />
        <textarea style={{backgroundColor: '#F9F3EA'}} minLength="25" maxLength="1000" rows="4" cols="50" value={description} onChange={this.onTextChangeDescription} /><br />
        <label style={{fontWeight:'600'}}>Location</label><br /></div>
		<div className="LocationDetails">
		<div className="Zip"><input style={{backgroundColor: '#F9F3EA'}} type="text" placeholder="ZIP CODE" value={locationZip} onChange={this.onTextChangeLocationZip} onBlur={this.callZipInfo2}  /><br /></div>
        <div className="City"><input style={{backgroundColor: '#F9F3EA'}} type="text" placeholder="CITY" value={location} /><br /></div>

        <div className="State"><input style={{backgroundColor: '#F9F3EA'}} type="text" placeholder="STATE" value={locationState} /></div>
		</div>



        <input type="hidden" value={submittedby} />
        <input type="hidden" value={contactinfo} />

        {
          (contactinfo !== email) ? (
            <input required type="text" placeholder="Your Contact Number" value={phone} onChange={this.onChangePhone} />
          ) : (null)
        }


        {
          (category === 'auto') ? (
            <>
            <br />
            <label>Car Make</label><br />
            <input type="text" placeholder="Toyota, Honda, etc..." value={carmake} onChange={this.onTextChangeCarmake} /><br />
            <label>Car Model</label><br />
            <input type="text" placeholder="Camry, Civic, etc..." value={carmodel} onChange={this.onTextChangeCarmodel} /><br />
            <label>Car Year</label><br />
            <input type="text" placeholder="2018, 2017, etc..." value={caryear} onChange={this.onTextChangeCaryear} /><br />
            </>
          ) : (null)
        }


        {
          (category === 'cell') ? (
            <>
            <br />
            <label>Cell Make</label><br />
            <input type="text" placeholder="Apple, Samsung, LG, etc..." value={cellmake} onChange={this.onTextChangeCellmake} /><br />
            <label>Cell Model</label><br />
            <input type="text" placeholder="iPhone, Galaxy S10, V30, etc..." value={cellmodel} onChange={this.onTextChangeCellmodel} /><br />
            <label>Cell Carrier</label><br />
            <input type="text" placeholder="T-Mobile, Spring, Verizon, etc..." value={cellcarrier} onChange={this.onTextChangeCellcarrier} /><br />
            <label>Cell Operating System</label><br />
            <input type="text" placeholder="iOS, Android, Windows Phone, etc..." value={cellos} onChange={this.onTextChangeCellos} /><br />
            </>
          ) : (null)
        }


        {
          (category === 'game') ? (
            <>
            <br />
            <label>Gaming System</label><br />
            <input type="text" placeholder="Playstation 4, XBox One, PC, etc..." value={gamesystem} onChange={this.onTextChangeGamesystem} /><br />

            </>
          ) : (null)
        }
        <br />
        <button style={{border: 'none'}}onClick={this.validateForm}><img style={{height: '40px', width: '100px'}} src={PostButton} alt="PostButton"/></button>

        {console.log(submitError)}
        {
          (submitError) ? (
            <p>{submitError}</p>
          ) : (null)
        }
		</div>
      </div>
	  	  
    );
  }
}

export default NeedForm;
