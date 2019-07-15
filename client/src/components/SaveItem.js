import React, { Component } from 'react';

class SaveItem extends Component {
  constructor(props) {
    super(props);
    const item = this.props.item;

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const item = this.props.item;
    const token = this.props.token;

    fetch('/savelist/item/' + item, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json.message);
        if (json.message === 'Item Deleted!') {
          console.log('Delete Worked');
          window.location.reload();
        } else {
          console.log('Delete Did Not Work');
          console.log(json.error.message);
        }
      })
  }


  render() {
    return (
      <div className="DeleteItem">
      <h5>Are you sure you want to delete Item?</h5>
      <p>*Cannot be reversed</p>
      <button onClick={this.onDelete}>YES</button>
      <button onClick={this.props.onCancel}>Cancel</button>
      </div>
    );
  }
}

export default SaveItem;
