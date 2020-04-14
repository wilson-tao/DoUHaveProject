import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import ItemBackground from '../img/Post Box.png';
import LikeIcon from '../img/Heart- Light Grey.png';
import MessageIcon from '../img/Message- Light Grey.png';
import ShareIcon from '../img/Share- Light Grey.png';

class UserItems extends Component {

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
    this.onCancel = this.onCancel.bind(this);
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
        edit: true,
        deletethis: false
      })
    }
  }

  onDeleteItem(id) {
    const {
      singleResult,
      deletethis
    } = this.state;
    if (deletethis && (singleResult === id)) {
      this.setState({
        deletethis: false
      });
    } else if (deletethis) {
      this.setState({
        singleResult: id
      });
    } else {
      this.setState({
        singleResult: id,
        deletethis: true,
        edit: false
      });
    }
  }

  onCancel() {
    this.setState({
      edit: false,
      deletethis: false
    });
  }

  render() {
    const {
      userId,
      items,
      count,
      singleResult,
      edit,
      token,
      deletethis
    } = this.state;

    return (
      <div className="UserItems">

      {//Beging Mapping
        items.map(model =>
        <div className="resultItem" key={model._id} >
		<img style={{maxWidth:'350px', height: '300px'}} src={ItemBackground} alt="Logo" />
        <div style={{position:'absolute', top:'25px', left:'50px'}} className="itemRow">
		<div style={{minWidth:'170px'}} id="rowContainer" >
          <div id="itemPic"><img src={model.itemImg.substring(
            model.itemImg.lastIndexOf("/") - 17,
            model.itemImg.length
          )} /> </div>
		  <Container>
				<Row>
					<Col id="itemName">{model.name}</Col>
					<Col id="itemBudget">${model.budget.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Col>
				</Row>
				<Row>
					<Col id="itemCategory">{model.category} </Col>
					<Col id="itemLocation">{model.location}, {model.locationState}</Col>
				</Row>
		  </Container>
        </div>
		<hr style={{
				backgroundColor:'#000000',
				marginBottom: '1.5rem',
				marginTop: '2rem'
				}} />
		<div className="buttonContainer">
              <div className="share-button">
                <img className="share-button-img" src={LikeIcon} onClick={() => this.onSaveItem(model._id)}/>
              </div>
              <div className="save-button">
                <img className="save-button-img" src={MessageIcon} onClick={this.onClickToShow}/>
              </div>
              <div className="contact-button">
                <img className="contact-button-img" src={ShareIcon}/>
              </div>
            </div>
		</div>
       
        

        {
          this.state.deletethis && (singleResult === model._id) ?
          <DeleteItem item={model._id} deletethis={deletethis} token={token} onCancel={this.onCancel} /> :
          (null)
        }

        {
          this.state.edit && (singleResult === model._id) ?
          <EditItem item={model} edit={edit} token={token} onCancel={this.onCancel }/> :
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
