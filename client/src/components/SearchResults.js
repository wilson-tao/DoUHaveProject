import React, { Component } from 'react';
import ItemFull from './ItemFull';
import OfferSubmit from './OfferSubmit';
import SaveItem from './SaveItem';
import Categories from './Categories';

import saveicon from '../img/svg/001-save-file-option.svg';
import shareicon from '../img/svg/002-share-option.svg';
import contacticon from '../img/svg/003-contact.svg';

class SearchResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: this.props.searchResults,
      showItem: false,
      singleResult: '',
      closed: true,
      clickToShow: false,
      showOfferSubmit: false,
      showSaveItem: false,
      token: this.props.token,
      zipCode: this.props.zipCode,
      distance: this.props.distance,
    };

    this.onItemFull = this.onItemFull.bind(this);
    this.onOfferSubmit = this.onOfferSubmit.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.checkZip = this.checkZip.bind(this);
  }



  onItemFull(id) {
    this.setState({
      singleResult: id,
      showItem: true,
      closed: false
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.searchResults !== this.props.searchResults){
      this.setState({searchResults: nextProps.searchResults});
      console.log('ComponentWIllReceiveProps');

    }
  }

  onClickToShow = () => {
    const {clickToShow} = this.state;
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
      singleResult
    } = this.state;
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

  checkZip(zip) {
    let zipResults = this.props.zipResults;
    const parsed_results = [];

    for (var x = 0; x < zipResults.length; x++) {
      parsed_results.push(zipResults[x].zip_code);
    }

    var check_zip = parsed_results.includes(zip);

    return check_zip;
  }


  render() {

    const {
      searchResults,
      showItem,
      singleResult,
      closed

    } = this.state;

    let isAuth = this.props.isAuth
    let userName = this.props.userName
    let firstName = this.props.firstName
    let userId = this.props.userId
    let token = this.props.token
    let zipResults = this.props.zipResults
    let zipCode = this.props.zipCode
    let distance = this.props.distance
    let filteredResults = [];


    console.log("SearchResults: Results:", searchResults);
    console.log('Single result', singleResult);
    console.log("Zip Results", zipResults);
    console.log("check_zip", this.checkZip('75056'));
    console.log("Zip Code: ", zipCode);
    console.log("distance", distance);

    if (zipCode !== '' && distance !== '') {
      console.log("!!!!!!THIS IS WORKING!!!!!!!", searchResults);
      for (var i = 0; i < searchResults.length; i++) {
        console.log("!!!!IS THIS WORKING!!!!", this.checkZip(searchResults[i].locationZip));
        if (this.checkZip(searchResults[i].locationZip)) {
          filteredResults.push(searchResults[i]);

        }
      }
    } else {
      filteredResults = searchResults;
    }

    console.log("FILTERED: ", filteredResults);

    return (
      <div className="SearchResults">
      <h1>Search Results</h1>
      <Categories />
      <div className="categoryResults">
        {filteredResults.map(model =>
          <div className="resultItem" key={model._id} >

          <div className="itemRow">
            <div id="rowContainer">

              <div id="itemPic" onClick={() => this.onItemFull(model._id)}><img src={model.itemImg.substring(
                model.itemImg.lastIndexOf("/") - 17,
                model.itemImg.length
              )} /> </div>
              <h1 id="itemName">{model.name} </h1>
              <h3 id="itemBudget">Budget: ${model.budget.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} </h3>
            </div>
            <hr />
            <div className="itemRow">
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
              <ItemFull itemId={singleResult} closed={closed}/> :
              (null)
            }


            <hr />
          </div>
        )}
      </div>





      </div>
    );
  }
}

export default SearchResults;
