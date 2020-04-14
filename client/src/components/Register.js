import React, { Component } from 'react';
import 'whatwg-fetch';
import SubmitButton from '../img/Button- Submit.png';

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

    const signUpEmailLower = signUpEmail.toLowerCase();

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
          email: signUpEmailLower,
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
            signUpLastName: '',
            passwordConfirm: ''
          });
        } else {
          this.setState({
            signUpError: json.message,
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
        <h1>SIGN UP</h1>
		<h3 style={{
            fontWeight:'400',
			color:'#A9A9A9'
        }}>Be part of our community!</h3>
		<hr style={{
            backgroundColor:'#000000',
			width: '70%',
			marginTop: '30px'
        }} />
		<hr style={{
			backgroundColor:'#000000',
			width: '50%',
			marginTop: '30px'
        }} />
		<div>
		<div style={{
            fontWeight:'700'
        }}>LOGIN INFORMATION</div>
		<div className="SignupInput">
			<input className="SignupInput" type="text" placeholder="First Name" value={signUpFirstName} onChange={this.onTextboxChangeFirstName} /><br />
        </div>
		<div className="SignupInput">
			<input className="SignupInput" type="text" placeholder="Last Name" value={signUpLastName} onChange={this.onTextboxChangeLastName} /><br />
        </div>
		<div className="SignupInput">
			<input className="SignupInput" type="email" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} /><br />
        </div>
		<div className="SignupInput">
			<input className="SignupInput" type="password" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword} /><br />
        </div>
		<div className="SignupInput">
			<input className="SignupInput" type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={this.onTextboxChangePasswordConfirm} /><br />
       	</div><br />
		</div>
        <button style={{border:'none'}} onClick={this.onSignUp}><img style={{
				height: '40px',
			  width: '100px'}}
			  src={SubmitButton} alt="Submit" /></button>
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
