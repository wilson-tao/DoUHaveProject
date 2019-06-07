import React, { Component } from 'react';


class EditItem extends Component {
  constructor(props) {
    super(props);
    const item = this.props.item;

    this.state = {
      itemName: item.name,
    }

    this.onChangeName = this.onChangeName.bind(this);

    this.onSubmitEdits = this.onSubmitEdits.bind(this);
  }

  onChangeName(event) {
    this.setState({
      itemName: event.target.value
    });
  }

  onSubmitEdits() {
    const {
      itemName,
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
      itemName
    } = this.state;
    return (
      <div className="EditItem">
        <h1>Edit</h1>
        <label>Item Name</label><br />
        <input type="text" placeholder={item.name} value={itemName} onChange={this.onChangeName} />
        <button onClick={this.onSubmitEdits}>Save</button>
      </div>
    );
  }
}

export default EditItem;
