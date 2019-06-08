import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
  deleteFromStorage
} from '../util/storage';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      userName: props.userName,
      firstName: props.firstName,
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

     this.onSignIn = this.onSignIn.bind(this);

  }

  state = {
    userName: this.props.userName,
    firstName: this.props.firstName
  }

/*
  componentDidMount() {
      console.log('Mounting...');
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const { token } = obj;
        //Verify
        console.log('Checking Token...');
        console.log(token);
        fetch('/user/verify/' + token)
          .then(res => res.json())
          .then(json => {
            console.log(json.message);
            console.log(json.user);
            console.log(json.userName);
            console.log(json.firstName);
            if (json.message === 'User Verified') {
              console.log('Made it');
              this.setState({
                token,
                userName: json.userName,
                firstName: json.firstName,
                isLoading: false,
              });
            } else {
              this.setState({
                isLoading: false,
              });
            }
          });
      } else {
        console.log('No Token');
        this.setState({
          isLoading: false,
        });
      }
    }
*/

  componentDidMount() {
    let isAuth = this.props.isAuth;

  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }
  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }


  onSignIn(event) {
    event.preventDefault();
    //Grab state
    console.log("Sign In function");
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    const signInEmailLower = signInEmail.toLowerCase();

    this.setState({
      isLoading: true,
    });

    //Post request to backend
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmailLower,
        password: signInPassword,
      }),
    }).then(res => res.json())
    .then(json => {
      console.log(json.message);
      if (json.message === 'Auth Successful') {
        console.log(json.token);
        setInStorage('the_main_app', { token: json.token });
        this.setState({
          signInError: '',
          isLoading: false,
          signInEmail: '',
          signInPassword: '',
          token: json.token,
          userName: json.userName,
          firstName: json.firstName,
          isAuth: true
        });
        window.location.reload();
      } else {
        this.setState({
          signInError: json.message,
          isLoading: false
        });
      }
    });


  }

  onLogout() {
    deleteFromStorage();
  }


  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      //userName,
      //firstName
    } = this.state;

    let isAuth = this.props.isAuth;

/*
    if (userName === '') {
      console.log('UserName Empty');
      let userName = this.props.userName;
      console.log('New Username:', userName);
    }
*/

    let userName = this.props.userName;
    let firstName = this.props.firstName;



    return (
      <div className="Login">
        {
          (!isAuth) ? (
            <>
              <form onSubmit={(e) => this.onSignIn(e)}>
                <input type="email" placeholder="Email" value={signInEmail} onChange={this.onTextboxChangeSignInEmail} />
                <input type="password" placeholder="Password" value={signInPassword} onChange={this.onTextboxChangeSignInPassword} />
                <button type="submit">Sign In</button><br />
              </form>
              <a href="/Register">Register</a><div className="space-break"></div>
            </>
          ) : (null)
        }
        {
          (isAuth) ? (
            <>
            <p>Logged In! <a href="/userpanel">Welcome, {firstName}! ({userName})</a></p>
            <a href="#" onClick={this.onLogout}>Logout</a><br />
            </>
          ) : (null)
        }
        {
          (signInError) ? (
            <p>{signInError}</p>
          ) : (null)
        }



      </div>
    );
  }
}

export default Login;
