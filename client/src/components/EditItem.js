import React, { Component } from 'react';


class EditItem extends Component {
  constructor(props) {
    super(props);
    const item = this.props.item;

    this.state = {
      itemName: item.name,
      itemBudget: item.budget,
      itemCategory: item.category,
      itemLocation: item.location,
      itemState: item.locationState,
      itemCondition: item.condition,
      itemDescription: item.description,
      itemSubmittedby: item.submittedby,

    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBudget = this.onChangeBudget.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCondition = this.onChangeCondition.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSubmittedby = this.onChangeSubmittedby.bind(this);

    this.onSubmitEdits = this.onSubmitEdits.bind(this);
  }

  onChangeName(event) {
    this.setState({
      itemName: event.target.value
    });
  }
  onChangeBudget(event) {
    this.setState({
      itemBudget: event.target.value
    });
  }
  onChangeCategory(event) {
    this.setState({
      itemCategory: event.target.value
    });
  }
  onChangeLocation(event) {
    this.setState({
      itemLocation: event.target.value
    });
  }
  onChangeState(event) {
    this.setState({
      itemState: event.target.value
    });
  }
  onChangeCondition(event) {
    this.setState({
      itemCondition: event.target.value
    });
  }
  onChangeDescription(event) {
    this.setState({
      itemDescription: event.target.value
    });
  }
  onChangeSubmittedby(event) {
    this.setState({
      itemSubmittedby: event.target.value
    });
  }


  onSubmitEdits() {
    const {
      itemName,
      itemBudget,
      itemCategory,
      itemLocation,
      itemState,
      itemCondition,
      itemDescription,
      itemSubmittedby
    } = this.state;
    const item = this.props.item;
    const token = this.props.token;

    fetch('/items/item/edit/' + item._id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: itemName,
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.message);
        if (json.message === 'Item updated!') {
          console.log('Update Worked');
          window.location.reload();

        } else {
          console.log('Update Did Not Work');
          console.log(json.error.message);
        }
      })
  }


  render() {
    console.log(this.props.item);
    const item = this.props.item;
    const {
      itemName,
      itemBudget,
      itemCategory,
      itemLocation,
      itemState,
      itemCondition,
      itemDescription,
      itemSubmittedby
    } = this.state;
    return (
      <div className="EditItem">
        <h1>Edit</h1>
        <label>Item Name</label><br />
        <input type="text" placeholder={item.name} value={itemName} onChange={this.onChangeName} /><br />
        <label>Budget</label><br />
        <input type="text" placeholder={item.budget} value={itemBudget} onChange={this.onChangeBudget} /><br />
        <label>Category</label><br />
        <label>City</label><br />
        <input type="text" placeholder={item.location} value={itemLocation} onChange={this.onChangeLocation} /><br />
        <label>State</label><br />
        <label>Condition</label><br />
        <label>Description</label><br />
        <textarea minLength="25" maxLength="1000" rows="4" cols="50" placeholder={item.description} value={itemDescription} onChange={this.onChangeDescription} /><br />
        <label>Your Name</label><br />
        <input type="text" placeholder={item.submittedby} value={itemSubmittedby} onChange={this.onChangeSubmittedby} /><br />
        <button onClick={this.onSubmitEdits}>Save</button>
      </div>
    );
  }
}

export default EditItem;
