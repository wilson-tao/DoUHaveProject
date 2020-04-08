import React, { Component } from 'react';



class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      token: this.props.token,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      edit: false,
      submitError: ''

    }
    this.onTextboxChangeUsername = this.onTextboxChangeUsername.bind(this);
    this.onTextboxChangeFirstName = this.onTextboxChangeFirstName.bind(this);
    this.onTextboxChangeLastName = this.onTextboxChangeLastName.bind(this);
    this.onTextboxChangeStreetAddress = this.onTextboxChangeStreetAddress.bind(this);
    this.onTextboxChangeCity = this.onTextboxChangeCity.bind(this);
    this.onTextboxChangeState = this.onTextboxChangeState.bind(this);
    this.onTextboxChangeZip = this.onTextboxChangeZip.bind(this);

    this.validateForm = this.validateForm.bind(this);
    this.onSubmitEdits = this.onSubmitEdits.bind(this);

    this.onEditClick = this.onEditClick.bind(this);

  }

  onTextboxChangeUsername(event) {
    this.setState({
      userName: event.target.value,
    });
  }
  onTextboxChangeFirstName(event) {
    this.setState({
      firstName: event.target.value,
    });
  }
  onTextboxChangeLastName(event) {
    this.setState({
      lastName: event.target.value,
    });
  }
  onTextboxChangeStreetAddress(event) {
    this.setState({
      streetAddress: event.target.value,
    });
  }
  onTextboxChangeCity(event) {
    this.setState({
      city: event.target.value,
    });
  }
  onTextboxChangeState(event) {
    this.setState({
      state: event.target.value,
    });
  }
  onTextboxChangeZip(event) {
    this.setState({
      zip: event.target.value,
    });
  }

  onSubmitEdits() {
    const {
      userName,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zip,
      userId,
      token
    } = this.state;

    fetch('/user/edit/' + userId, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        streetAddress: streetAddress,
        city: city,
        state: state,
        zip: zip
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.message);
        if (json.message === 'User Updated!') {
          console.log('Update Worked');
          this.setState({
            edit: false
          });
        } else {
          console.log('Update Did Not Work');
          console.log(json.error.message);
        }
      })

  }

  componentDidMount() {
    const {
      userId,
      userName,
      firstName,
      lastName,
      email,
      streetAddress,
      city,
      state,
      zip,
      token
    } = this.state;

    //let isAuth = this.props.isAuth;
    //let userId = this.props.userId;

    console.log('Token:', token);
    console.log('UserId:', userId);
    console.log("FETCHING!");
    fetch('user/user/' + userId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          this.setState({
            userName: json.userName,
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email,
            streetAddress: json.streetAddress,
            city: json.city,
            state: json.state,
            zip: json.zip
          })
        }
      })
  }

  onEditClick() {
    const {edit} = this.state;
    if (!edit) {
      this.setState({
        edit: true
      });
    } else {
      this.setState({
        edit: false
      });
    }
  }

  validateForm() {
    const {
      userName,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zip
    } = this.state;

    if (firstName === '') {
      this.setState({
        submitError: 'First Name Cannot Be Empty'
      });
      return
    } else if (lastName === '') {
      this.setState({
        submitError: 'Last Name Cannot Be Empty'
      });
      return
    } else if (streetAddress === '') {
      this.setState({
        submitError: 'Address Cannot Be Empty'
      });
      return
    } else if (city === '') {
      this.setState({
        submitError: 'City Cannot Be Empty'
      });
      return
    } else if (state === '') {
      this.setState({
        submitError: 'Must Choose State'
      });
      return
    } else if (zip === '') {
      this.setState({
        submitError: 'Zip Cannot Be Empty'
      });
      return
    } else if (zip.length !== 5 ) {
      this.setState({
        submitError: 'Not a Valid Zip Code'
      });
      return
    } else {
      this.onSubmitEdits()
    }
  }



  render() {
    const {
      userName,
      firstName,
      lastName,
      email,
      streetAddress,
      city,
      state,
      zip,
      edit,
      signUpUsername,
      signUpFirstName,
      signUpLastName,
      signUpStreetAddress,
      signUpCity,
      signUpState,
      signUpZip,
      submitError
    } = this.state;

    if (!edit) {
      return (
        <div style={{paddingTop:'30px'}} className="UserInfo">
		<div style={{marginLeft: '400px', textAlign:'left'}}>
			<h1>HI {firstName}</h1>
			<button onClick={this.onEditClick}>Edit</button>
         </div>
		 <div>
          <label>Address: {streetAddress}</label><br />
          <label>City: {city}</label><br />
          <label>State: {state}</label><br />
          <label>Zip: {zip}</label><br />
		  </div>
          
        </div>
      );

    } else {
      return (
        <div className="UserInfo">
          <h4>Edit</h4>

          
          <input type="text" placeholder={firstName} value={firstName} onChange={this.onTextboxChangeFirstName} /><br />
          <input type="text" placeholder={lastName} value={lastName} onChange={this.onTextboxChangeLastName} /><br />
          <br />
          <input type="text" placeholder={streetAddress} value={streetAddress} onChange={this.onTextboxChangeStreetAddress} /><br />
          <input type="text" placeholder={city} value={city} onChange={this.onTextboxChangeCity} /><br />
          <select value={state} onChange={this.onTextboxChangeState}>
            <option value=""></option>
            <option value="OK">OK</option>
            <option value="TX">TX</option>
          </select>
          <br />
          <input type="text" placeholder={zip} value={zip} onChange={this.onTextboxChangeZip} /><br />
          <button onClick={this.validateForm}>Save</button> <button onClick={this.onEditClick}>Cancel</button>
          {
            (submitError) ? (
              <p>{submitError}</p>
            ) : (null)
          }
        </div>
      );
    }
  }
}

export default UserInfo;
