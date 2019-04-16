import React, { Component } from 'react';


class ItemFull extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemId: this.props.itemId,
      itemFetch: '',
      imgSrc: '',
      closed: this.props.closed
    };
    this.onClose = this.onClose.bind(this);

  }

  componentDidMount() {
    const {
      itemId,
      itemFetch,
      imgSrc,
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
            itemFetch: json.item,
            imgSrc: json.item.itemImg.substring(
              json.item.itemImg.lastIndexOf("/") - 17,
              json.item.itemImg.length
            )
          })
        }
      })
  }

  onClose = () => {
    const {closed} = this.state;
    console.log("On Close Function");
    if (!closed) {
      this.setState({
        closed: true
      })
    } else {
      this.setState({
        closed: false
      })
    }

  }



  render() {
    const {
      itemId,
      itemFetch,
      imgSrc,
      closed
    } = this.state;

    console.log("ITEM FETCH", itemFetch);
    console.log("IMAGE SRC", imgSrc);

    return (
      <div className="ItemFull" onClick={this.onClose} style={{display: this.state.closed ? 'none' : 'block'}}>
      <div className="item-panel">
        <div className="close-panel" onClick={this.onClose}>X</div>

        <img src={imgSrc} />


      </div>
      </div>
    );
  }
}

export default ItemFull;
