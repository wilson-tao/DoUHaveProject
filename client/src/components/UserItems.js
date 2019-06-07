import React, { Component } from 'react';
import EditItem from './EditItem';



class UserItems extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      token: this.props.token,
      items: [],
      count: '',
      edit: false,
      singleResult: ''
    }
  }

  componentDidMount() {
    const {
      userId,
      token,
      items,
      count
    } = this.state;
    fetch('items/user/' + userId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.count > 0) {
          this.setState({
            items: json.items,
            count: json.count
          });
        }
      })
  }

  onEditItem(id) {
    const {
       edit,
       singleResult
     } = this.state;
    if (edit && (singleResult === id)) {
      this.setState({
        edit: false
      });
    } else if (edit) {
      this.setState({
        singleResult: id
      });
    } else {
      this.setState({
        singleResult: id,
        edit: true
      })
    }
  }

  render() {
    const {
      userId,
      items,
      count,
      singleResult,
      edit,
      token
    } = this.state;

    return (
      <div className="UserItems">

      {//Beging Mapping
        items.map(model =>
        <div className="resultItem" key={model._id} >

        <div className="itemRow">
          <div id="itemPic"><img src={model.itemImg.substring(
            model.itemImg.lastIndexOf("/") - 17,
            model.itemImg.length
          )} /> </div>
          <h5 id="itemName">{model.name} </h5>
          <h5 id="itemBudget">Budget: ${model.budget.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} </h5>
        </div>

        <div className="itemRow">
          <h5 id="itemCategory">Category: {model.category} </h5>
          <h5 id="itemLocation">Location: {model.location}, {model.locationState}</h5>

          <h5 id="itemCondition">Condition: {model.condition} </h5>
        </div>


        <div id="itemDate">
          <h5>Submitted On:</h5> {model.createdAt}
        </div>
        <button onClick={() => this.onEditItem(model._id)}>Edit</button>
        <button>Delete</button>

        {
          this.state.edit && (singleResult === model._id) ?
          <EditItem item={model} edit={edit} token={token} /> :
          (null)
        }




          <hr />
        </div>
      )//End Mapping
      }



      </div>
    );
  }
}

export default UserItems;
