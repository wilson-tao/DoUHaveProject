import React, { Component } from 'react';


class ItemFull extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemId: this.props.itemId,
      itemFetch: '',
      closed: this.props.closed
    };
    this.onClose = this.onClose.bind(this);

  }

  componentDidMount() {
    const {
      itemId,
      itemFetch,
    } = this.state;

    fetch('/items/item/' + itemId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.item) {
          this.setState({
            itemFetch: json.item
          })
        }
      })
  }

  onClose() {
    console.log("On Close Function");
    this.setState({
      closed: true
    })
  }



  render() {
    const {
      itemId,
      itemFetch,
      closed
    } = this.state;

    return (
      <div className="ItemFull" style={{display: this.state.closed ? 'none' : 'block'}}>
      <div className="item-panel">
        <div className="close-panel" onClick={this.onClose}>X</div>
        <label> Name: {itemFetch.name} </label> <br />
        <label> Budget: {itemFetch.budget} </label> <br />
        <label> Category: {itemFetch.category} </label> <br />
        <label> Condition: {itemFetch.condition} </label> <br />
        <label> Description: {itemFetch.description} </label> <br />
        <label> Location: {itemFetch.location} </label> <br />
        <label>Submitted By: {itemFetch.submittedby} </label> <br />
        <label>Submitted On: {itemFetch.createdAt} </label> <br />
        <label>Expires On: {itemFetch.expirationDate} </label> <br />

        {
          (itemFetch.carmake !== '' && itemFetch.carmake !== null && itemFetch.carmake !== undefined) ? (
            <>
            <label>Car Make: {itemFetch.carmake}</label><br />
            </>
          ) : (null)
        }
        {

          (itemFetch.carmodel !== '' && itemFetch.carmodel !== null && itemFetch.carmodel !== undefined) ? (
            <>
            <label>Car Model: {itemFetch.carmodel}</label><br />
            </>
          ) : (null)
        }
        {

          (itemFetch.caryear !== '' && itemFetch.caryear !== null && itemFetch.caryear !== undefined) ? (
            <>
            <label>Car Year: {itemFetch.caryear}</label><br />
            </>
          ) : (null)
        }
        {

          (itemFetch.cellmake !== '' && itemFetch.cellmake !== null && itemFetch.cellmake !== undefined) ? (
            <>
            <label>Cell Make: {itemFetch.cellmake}</label><br />
            </>
          ) : (null)
        }
        {

          (itemFetch.cellmodel !== '' && itemFetch.cellmodel !== null && itemFetch.cellmodel !== undefined) ? (
            <>
            <label>Cell Model: {itemFetch.cellmodel}</label><br />
            </>
          ) : (null)
        }
        {

          (itemFetch.cellcarrier !== '' && itemFetch.cellcarrier !== null && itemFetch.cellcarrier !== undefined) ? (
            <>
            <label>Cell Carrier: {itemFetch.cellcarrier}</label><br />
            </>
          ) : (null)
        }
        {

          (itemFetch.cellos !== '' && itemFetch.cellos !== null && itemFetch.cellos !== undefined) ? (
            <>
            <label>Cell Operating System: {itemFetch.cellos}</label><br />
            </>
          ) : (null)
        }
        {

          (itemFetch.gamesystem !== '' && itemFetch.gamesystem !== null && itemFetch.gamesystem !== undefined) ? (
            <>
            <label>Game System: {itemFetch.gamesystem}</label><br />
            </>
          ) : (null)
        }
      </div>
      </div>
    );
  }
}

export default ItemFull;
