import React, { Component } from 'react';



class UserSaveList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      token: this.props.token,
      items: [],
      count: '',
      edit: false,
      singleResult: '',
      deletethis: false
    }
  }

  componentDidMount() {
    const {
      userId,
      token,
      items,
      count
    } = this.state;
    fetch('savelist/' + userId, {
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

  render() {
    const {
      userId,
      items,
      count,
      singleResult,
      token,
      deletethis
    } = this.state;

    console.log(items);

    return (
      <div className="UserSaveList">

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











            <hr />
          </div>
        )//End Mapping
        }
      </div>
    );
  }
}

export default UserSaveList;
