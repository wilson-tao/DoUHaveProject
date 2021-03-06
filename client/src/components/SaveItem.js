import React, { Component } from 'react';

class SaveItem extends Component {
  constructor(props) {
    super(props);
    const item = this.props.model;
    const token = this.props.token;

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const item = this.props.model;
    const token = this.props.token;
    const firstName = this.props.firstName;
    const userId = this.props.userId;

    console.log(item);
    console.log(userId);


    fetch('/savelist/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        itemId: item._id,
        name: item.name,
        itemImg: item.itemImg,
        budget: item.budget,
        category: item.category,
        condition: item.condition,
        location: item.location,
        locationState: item.locationState,
        submittedby: item.submittedby,
        submittedby1: item.submittedby1,
        savedby: firstName,
        savedby1: userId
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.message);
        if (json.message === 'List Saved') {
          console.log('Save Item Worked');
          window.location.reload();
        } else {
          console.log('Save Item Did Not Work');
          console.log(json.error.message);
        }
      })
  }


  render() {
    let isAuth = this.props.isAuth;

    return (
      <div className="SaveItem">
      {
        (!isAuth) ?
        <p>Please Log In or Register...</p> :
        (null)
      }
      {
        (isAuth) ?
        <>
          <div style={{fontWeight: '500', fontSize: '11px'}}>Are you sure you want to Save Item?</div>

          <button style={{fontSize:'11px', border: 'none'}} onClick={this.onSave}>YES</button>
          <button style={{fontSize: '11px', border: 'none'}}onClick={this.props.onCancel}>Cancel</button>
        </> :
        (null)
      }

      </div>
    );
  }
}

export default SaveItem;
