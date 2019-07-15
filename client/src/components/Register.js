import React, { Component } from 'react';
import 'whatwg-fetch';


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      signUpError: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
      passwordConfirm: ''
    };
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeFirstName = this.onTextboxChangeFirstName.bind(this);
    this.onTextboxChangeLastName = this.onTextboxChangeLastName.bind(this);
    this.onTextboxChangePasswordConfirm = this.onTextboxChangePasswordConfirm.bind(this);



    this.onSignUp = this.onSignUp.bind(this);

  }




  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onTextboxChangeFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onTextboxChangeLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }


  onTextboxChangePasswordConfirm(event) {
    this.setState({
      passwordConfirm: event.target.value,
    });
  }



  onSignUp() {
    //Grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      passwordConfirm
    } = this.state;

    this.setState({
      isLoading: true,
    });

    if (signUpPassword === passwordConfirm) {
      fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName: signUpFirstName,
          lastName: signUpLastName,
          email: signUpEmail,
          password: signUpPassword
        }),
      }).then(res => res.json())
      .then(json => {
        console.log(json.message);
        if (json.message === "User Created") {
          console.log('it worked');
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: ''
          });
        } else {
          this.setState({
            signUpError: json.error.message,
            isLoading: false
          });
        }
      });
    } else {
      alert("Password Fields Do Not Match!");

    }
    //Post request to backend

  }

  render() {
    const {
      isLoading,
      signUpError,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      passwordConfirm,

    } = this.state;


    return (
      <div className="Register">
        <h1>Sign Up</h1>

        <input type="text" placeholder="First Name" value={signUpFirstName} onChange={this.onTextboxChangeFirstName} /><br />
        <input type="text" placeholder="Last Name" value={signUpLastName} onChange={this.onTextboxChangeLastName} /><br />
        <input type="email" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} /><br />
        <input type="password" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword} /><br />
        <input type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={this.onTextboxChangePasswordConfirm} /><br />
        <br />

        <button onClick={this.onSignUp}>Sign Up</button>
        {console.log(signUpError)}
        {
          (signUpError) ? (
            <p>{signUpError}</p>
          ) : (null)
        }
      </div>
    );
  }
}

export default Register;
