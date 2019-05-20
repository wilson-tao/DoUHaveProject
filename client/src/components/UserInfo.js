import React, { Component } from 'react';



class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      isAuth: this.props.isAuth,
      token: this.props.token,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: ''
    }

  }

  componentDidMount() {
    const {
      userId,
      isAuth,
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




  render() {
    const {
      userName,
      firstName,
      lastName,
    } = this.state;

    return (
      <div className="UserInfo">
        <label>Username: {userName}</label>

      </div>
    );
  }
}

export default UserInfo;
