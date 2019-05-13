import React, { Component } from 'react';




class NeedForm extends Component {

  constructor (props) {
    super(props);
    let firstName = this.props.firstName;
    let userName = this.props.userName;
    let userId = this.props.userId;

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
      submittedby: '',
      submittedby1: userId,
      carmake: '',
      carmodel: '',
      caryear: '',
      cellmake: '',
      cellmodel: '',
      cellcarrier: '',
      cellos: '',
      gamesystem: '',
      contactinfo: ''
    };
    this.onTextChangeName = this.onTextChangeName.bind(this);
    this.onChangeItemImg = this.onChangeItemImg.bind(this);
    this.onTextChangeBudget = this.onTextChangeBudget.bind(this);
    this.onTextChangeCategory = this.onTextChangeCategory.bind(this);
    this.onTextChangeCondition = this.onTextChangeCondition.bind(this);
    this.onTextChangeDescription = this.onTextChangeDescription.bind(this);
    this.onTextChangeLocation = this.onTextChangeLocation.bind(this);
    this.onTextChangeLocationState = this.onTextChangeLocationState.bind(this);
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

    this.onSubmit = this.onSubmit.bind(this);
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
            submittedby: '',
            submittedby1: '',
            carmake: '',
            carmodel: '',
            caryear: '',
            cellmake: '',
            cellmodel: '',
            cellcarrier: '',
            cellos: '',
            gamesystem: '',
            contactinfo: '',
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
            submittedby: '',
            submittedby1: '',
            carmake: '',
            carmodel: '',
            caryear: '',
            cellmake: '',
            cellmodel: '',
            cellcarrier: '',
            cellos: '',
            gamesystem: '',
            contactinfo: '',
          });
        } else {
          this.setState({
            submitError: json.error.message
          });
        }
      });
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



    var data = new FormData();
    data.append('name', name);
    data.append('itemImg', itemImg);
    data.append('budget', budget);
    data.append('category', category);
    data.append('condition', condition);
    data.append('description', description);
    data.append('location', location);
    data.append('locationState', locationState);
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
          submittedby: '',
          submittedby1: '',
          carmake: '',
          carmodel: '',
          caryear: '',
          cellmake: '',
          cellmodel: '',
          cellcarrier: '',
          cellos: '',
          gamesystem: '',
          contactinfo: '',
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


    let firstName = this.props.firstName;
    let userName = this.props.userName;
    let userId = this.props.userId;

    console.log(userName);
    console.log(firstName);
    console.log(userId);


    return (
      <div className="NeedForm">

        <input type="hidden" value={submittedby1} />
        <div id="itemName">
          <label>Item Name</label><br />
          <input type="text" placeholder="Item's name..." value={name} onChange={this.onTextChangeName} required /><br />
        </div>
        <div id="itemImg">
          <input type="file" name="itemImg" id="itemImg" onChange={this.onChangeItemImg}  />
        </div>
        <div className="itemRow">
          <div id="itemCategory">
            <label>Category</label><br />
            <select required name={category} onChange={this.onTextChangeCategory}>
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
            <label>Budget</label><br />
            <input required type="text" placeholder="How much are you willing to pay?" value={budget} onChange={this.onTextChangeBudget} /><br />
          </div>
          <div id="itemCondition">
            <label>Condition</label><br />
            <select required name={condition} onChange={this.onTextChangeCondition}>
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
        </div>
        <label>Description</label><br />
        <textarea minlength="25" maxlength="1000" rows="4" cols="50" placeholder="Provide a short description of the item..." value={description} onChange={this.onTextChangeDescription} /><br />
        <label>Location</label><br />
        <input type="text" placeholder="City..." value={location} onChange={this.onTextChangeLocation} /><br />

        State: <select required name={locationState} onChange={this.onTextChangeLocationState}>
          <option value=""></option>
          <option value="TX">TX</option>
          <option value="OK">OK</option>
        </select>
        <p>*currently limited to TX & OK</p>
        <label>Submitted by (Name or Username)</label><br />
        <input required type="text" placeholder="Your Name" value={submittedby} onChange={this.onTextChangeSubmittedby} /><br />
        <input required type="text" placeholder="Your Contact Number" value={contactinfo} onChange={this.onTextChangeContactInfo} /><br />
        <br />
        <label>Car Make</label><br />
        <input type="text" placeholder="Toyota, Honda, etc..." value={carmake} onChange={this.onTextChangeCarmake} /><br />
        <label>Car Model</label><br />
        <input type="text" placeholder="Camry, Civic, etc..." value={carmodel} onChange={this.onTextChangeCarmodel} /><br />
        <label>Car Year</label><br />
        <input type="text" placeholder="2018, 2017, etc..." value={caryear} onChange={this.onTextChangeCaryear} /><br />
        <br />
        <label>Cell Make</label><br />
        <input type="text" placeholder="Apple, Samsung, LG, etc..." value={cellmake} onChange={this.onTextChangeCellmake} /><br />
        <label>Cell Model</label><br />
        <input type="text" placeholder="iPhone, Galaxy S10, V30, etc..." value={cellmodel} onChange={this.onTextChangeCellmodel} /><br />
        <label>Cell Carrier</label><br />
        <input type="text" placeholder="T-Mobile, Spring, Verizon, etc..." value={cellcarrier} onChange={this.onTextChangeCellcarrier} /><br />
        <label>Cell Operating System</label><br />
        <input type="text" placeholder="iOS, Android, Windows Phone, etc..." value={cellos} onChange={this.onTextChangeCellos} /><br />
        <br />
        <label>Gaming System</label><br />
        <input type="text" placeholder="Playstation 4, XBox One, PC, etc..." value={gamesystem} onChange={this.onTextChangeGamesystem} /><br />
        <button onClick={this.onSubmit}>Submit</button>
        {console.log(submitError)}
        {
          (submitError) ? (
            <p>{submitError}</p>
          ) : (null)
        }

      </div>
    );
  }
}

export default NeedForm;
