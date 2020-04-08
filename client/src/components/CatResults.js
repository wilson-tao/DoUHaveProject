import React, { Component } from 'react';
import ItemFull from './ItemFull';
import OfferSubmit from './OfferSubmit';
import SaveItem from './SaveItem';
import Categories from './Categories';
import saveicon from '../img/svg/001-save-file-option.svg';
import shareicon from '../img/svg/002-share-option.svg';
import contacticon from '../img/svg/003-contact.svg';


class CatResults extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoaded: false,
      models: [],
      category: this.props.category,
      showItem: false,
      singleResult: '',
      showResults: true,
      closed: true,
      clickToShow: false,
      showOfferSubmit: false,
      showSaveItem: false,
      token: this.props.token

    };
    this.onItemFull = this.onItemFull.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.onOfferSubmit = this.onOfferSubmit.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    console.log('Mounting CatResults');
    const {
      isLoaded,
      models,
      showItem,
      singleResult
      //category
    } = this.state;

    let category = this.props.category;
    console.log('CatResults Category:', category);

    fetch('/items/' + category, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {

        if (json) {
          console.log('CatResults Fetched');
          this.setState({
            isLoaded: true,
            models: json.items
          })
        } else {
          this.setState({
            isLoaded: false
          })
        }
      })
  }

  changeCategory(cat) {
    console.log(cat);
    this.setState({
      category: cat,
      showResults: false
    })

    const {
      isLoaded,
      models,
      showItem,
      singleResult
      //category
    } = this.state;

    let category = cat;
    fetch('/items/' + category, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        console.log(json.count);
        console.log(json.items);
        if (json) {
          console.log('It Worked');
          this.setState({
            isLoaded: true,
            models: json.items
          })
        } else {
          this.setState({
            isLoaded: false
          })
        }
      })
  }

  onItemFull(id) {
    this.setState({
      singleResult: id,
      showItem: true,
      closed: false
    })
  }

  onClickToShow = () => {
    const {
      clickToShow,
      showSaveItem
    } = this.state;
    this.setState({
      showSaveItem: false
    })
    if (!clickToShow) {
      this.setState({
        clickToShow: true
      })
    } else {
      this.setState({
        clickToShow: false
      })
    }
  }

  onOfferSubmit = (id) => {
    const {
      showOfferSubmit,
      singleResult
    } = this.state;
    if (singleResult !== '' && singleResult !== id) {
      this.setState({
        singleResult: id,
        showOfferSubmit: true
      });
    } else {
      if (!showOfferSubmit) {
        this.setState({
          singleResult: id,
          showOfferSubmit: true
        })
      } else {
        this.setState({
          showOfferSubmit: false,
          singleResult: ''
        })
      }
    }
  }

  onSaveItem = (id) => {
    const {
      showSaveItem,
      singleResult,
      clickToShow
    } = this.state;
    this.setState({
      showItem: false,
      clickToShow: false
    });

    if (singleResult !== '' && singleResult !== id) {
      this.setState({
        singleResult: id,
        showSaveItem: true
      });
    } else {
      if (!showSaveItem) {
        this.setState({
          singleResult: id,
          showSaveItem: true
        });
      } else {
        this.setState({
          showSaveItem: false,
          singleResult: ''
        });
      }
    }
  }

  onCancel() {
    this.setState({
      showSaveItem: false
    });
  }

  onClose() {
    this.setState({
      showItem: false
    });
  }

  render() {

    const {
      isLoaded,
      models,
      category,
      showItem,
      singleResult,
      showResults,
      closed,

    } = this.state;

    let isAuth = this.props.isAuth
    let userName = this.props.userName
    let firstName = this.props.firstName
    let userId = this.props.userId
    let token = this.props.token

    console.log("Save Icon:", saveicon);





    return (
      <div className="CatResults">
      <h1>DO YOU HAVE</h1>
	  <h3 style={{
            fontWeight:'400',
			color:'#A9A9A9'
        }} >What people are looking for?</h3>
      <Categories />

       
        <div className="categoryResults">
          {models.map(model =>
            <div className="resultItem" key={model._id} >

            <div className="itemRow"  >
              <div id="rowContainer" >
                <div id="itemPic" ><img onClick={() => this.onItemFull(model._id)} src={model.itemImg.substring(
                  model.itemImg.lastIndexOf("/") - 17,
                  model.itemImg.length
                )} /> </div>
                <h1 id="itemName">{model.name} </h1>
                <h3 id="itemBudget">Budget: ${model.budget.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} </h3>



                <h5 id="itemCategory">Category: {model.category} </h5>
                <h5 id="itemLocation">Location: {model.location}, {model.locationState} {model.locationZip}</h5>
              </div>
            </div>


            <div className="buttonContainer">
              <div className="share-button">
                <img className="share-button-img" src={shareicon} />
              </div>
              <div className="save-button">
                <img className="save-button-img" src={saveicon} onClick={() => this.onSaveItem(model._id)} />
              </div>
              <div className="contact-button">
                <img className="contact-button-img" src={contacticon} onClick={this.onClickToShow} />
              </div>
            </div>


              {
              //  <div className="offer-button">
              //    <button onClick={() => this.onOfferSubmit(model._id)}>Make Offer</button>
              //  </div>
              }


              {
              //Check if Logged in and fetch user data in component
              //If component does not get user data, return "Please Log In"
              //If Logged in, pass itemId, ownerId, component will have offerer id from fetch
              }
              {
                this.state.showOfferSubmit && (singleResult === model._id) ?
                <OfferSubmit itemId={model._id} ownerId={model.submittedby1} userName={userName} firstName={firstName} userId={userId} isAuth={isAuth} /> :
                (null)
              }

              {
                //Save Item
                this.state.showSaveItem && (singleResult === model._id) ?
                <SaveItem model={model} userId={userId} firstName={firstName} isAuth={isAuth} token={token} onCancel={this.onCancel} /> :
                (null)
              }
              {
                //Single Result, if state is showItem and there is singleResult with model._id

              }
              {
                this.state.showItem && (singleResult === model._id) ?
                <ItemFull itemId={singleResult} closed={closed} isAuth={isAuth} onClose={this.onClose} /> :
                (null)
              }

              {
                 this.state.clickToShow ? (
                   isAuth ? (model.contactinfo) : <p>Please Log In</p>
                 ) : (null)
               }



            </div>
          )}

        </div>

      </div>
    );
  }
}

export default CatResults;
