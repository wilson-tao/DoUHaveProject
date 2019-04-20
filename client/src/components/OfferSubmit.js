import React, { Component } from 'react';



class OfferSubmit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemId: this.props.itemId,
      ownerId: this.props.ownerId,
      userName: this.props.userName,
      firstName: this.props.firstName,
      userId: this.props.userId,
      isAuth: this.props.isAuth,
      myEmail: '',
      myPhone: '',
      myMessage: '',
      myOffer: ''
    }

    this.onChangeOffer = this.onChangeOffer.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
  }

  onChangeOffer(event) {
    this.setState({
      myOffer: event.target.value
    });
  }
  onChangeEmail(event) {
    this.setState({
      myEmail: event.target.value
    });
  }
  onChangePhone(event) {
    this.setState({
      myPhone: event.target.value
    });
  }
  onChangeMessage(event) {
    this.setState({
      myMessage: event.target.value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const {
      isAuth,
      itemId,
      ownerId,
      userName,
      firstName,
      userId,
      myEmail,
      myOffer,
      myPhone,
      myMessage
    } = this.state;

    fetch('/offers/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        itemId: itemId,
        itemOwner: ownerId,
        myOffer: myOffer,
        submittedBy: userId,
        contactPhone: myPhone,
        contactEmail: myEmail,
        offerMessage: myMessage
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.message === 'Offer Sent') {
          alert("Thanks for your offer! You should hear back from the buyer soon...");
          this.setState({
            myOffer: '',
            myPhone: '',
            myEmail: '',
            myMessage: ''
          });
        } else {
          alert('There was an error:',json.error.message);
        }
      });
  }

  render() {

    const {
      isAuth,
      itemId,
      ownerId,
      userName,
      firstName,
      userId,
      myEmail,
      myOffer,
      myPhone,
      myMessage
    } = this.state;

    console.log('OfferSubmit.js isAuth:', isAuth);

    return (
      <div className="OfferSubmit">
        {
          (!isAuth) ?
            <p>Please Log In or Register...</p> :
            (null)
        }
        {
          (isAuth) ?
            <>
            <h5>Awesome! {firstName} ({userName}), please submit your offer below...</h5>
              <div className="offer-submit-form">
                <form onSubmit={(e) => this.onFormSubmit(e)}>
                  <input type="hidden" value={itemId} />
                  <input type="hidden" value={ownerId} />
                  <input type="hidden" value={userId} />

                  <label>My Offer:$ </label> <input type="text" placeholder="$0" value={myOffer} onChange={this.onChangeOffer} /> <br />
                  <label>Best Phone to Reach: </label> <input type="text" placeholder="555-555-5555" value={myPhone} onChange={this.onChangePhone} /> <br />
                  <label>Best Email to Reach: </label> <input type="text" placeholder="Email@Email.com" value={myEmail} onChange={this.onChangeEmail} /> <br />
                  <label>Message: </label><br />
                  <textarea rows="4" cols="50" type="text" placeholder="Type a Message..." value={myMessage} onChange={this.onChangeMessage} /> <br />
                  <button type="submit">Submit</button>

                </form>
              </div>
            </> :
            (null)
        }

      </div>
    );
  }
}

export default OfferSubmit;
