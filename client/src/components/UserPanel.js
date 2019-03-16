import React, { Component } from 'react';


class UserPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      isAuth: this.props.isAuth,
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
      //userId,
      //isAuth,
      userName,
      firstName,
      lastName,
      email,
      streetAddress,
      city,
      state,
      zip
    } = this.state;

    let isAuth = this.props.isAuth;
    let userId = this.props.userId;
    console.log("UserPanel Triggered", isAuth);
    if (isAuth) {
      console.log("FETCHING!");
      fetch('user/user/' + userId, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
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
  }

  render() {


    const {
      //userId,
      //isAuth,
      userName,
      firstName,
      lastName,
      email,
      streetAddress,
      city,
      state,
      zip
    } = this.state;

    let isAuth = this.props.isAuth;
    let userId = this.props.userId;

    console.log("UserPanel:ID", userId);
    console.log("UserPanel:isAuth", isAuth);



    return (
      <div className="UserPanel">


        <h1>User Panel</h1>
          <label>UserName: {userName}</label>

      </div>
    );
  }
}

export default UserPanel;
