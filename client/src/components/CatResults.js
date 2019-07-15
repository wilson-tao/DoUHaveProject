import React, { Component } from 'react';
import ItemFull from './ItemFull';
import OfferSubmit from './OfferSubmit';
import SaveItem from './SaveItem';


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
      showSaveItem: false

    };
    this.onItemFull = this.onItemFull.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.onOfferSubmit = this.onOfferSubmit.bind(this);
    //this.onSaveItem = this.onSaveItem.bind(this);
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






    return (
      <div className="CatResults">
      <h1>Look for What People Need</h1>

      <div className="catSettings">
          <a href="/whatpeopleneed"><label value=''>All</label></a> |
          | <a href="/auto"><label value='auto'>Cars & Trucks</label></a> |
          | <a href="/appliances"><label value='appliance'>Appliances</label></a> |
          | <a href="/moto"><label value='moto'>Moto/ATV/UTV</label></a> |
          | <a href="/cell"><label value='cell'>Cell Phones</label></a> |
          | <a href="/furniture"><label value='furniture'>Furniture</label></a> |
          | <a href="/instruments"><label value='instrument'>Musical Instruments</label></a> |
          | <a href="/games"><label value='game'>Video Games</label></a> |
          | <a href="/clothing"><label value='clothing'>Clothing & Accessories</label></a> |
          | <a href="/collectibles"><label value='collectible'>Antiques & Collectibles</label></a> |
          | <a href="/beauty"><label value='beauty'>Beauty & Cosmetics</label></a> |
          | <a href="/comequip"><label value='comequip'>Commercial & Restaurant Equipment</label></a> |
          | <a href="/misc"><label value='misc'>Everything Else</label></a> |
          | <a href="/housing"><label value='housing'>Housing & Places to Live</label></a> |
          | <a href="/autoservice"><label value='autoservice'>Auto Services</label></a> |
          | <a href="/homeservice"><label value='homeservice'>Home Services</label></a>


      </div>


        <hr />
        <div className="categoryResults">
          {models.map(model =>
            <div className="resultItem" key={model._id} >

            <div className="itemRow">
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
              <h5 id="itemLocation">Location: {model.location}, {model.locationState}</h5>

              <h5 id="itemCondition">Condition: {model.condition} </h5>
            </div>
            <div id="itemDescription">
              <h5 >Description: </h5><p>{model.description}</p>
            </div>
            <div id="itemSubmittedby">
              <h5>Submitted By: </h5> <p> {model.submittedby}</p><br />
              <h5>Contact Number: </h5> {
                this.state.clickToShow ? (
                  model.contactinfo
                ) : <p onClick={this.onClickToShow}>Click To Show</p>
              }
            </div>
            <div id="itemDate">
              <h5>Submitted On:</h5> {model.createdAt}
            </div>


              {
                (model.carmake !== '' && model.carmake !== null && model.carmake !== undefined) ? (
                  <>
                  <label>Car Make: {model.carmake}</label><br />
                  </>
                ) : (null)
              }
              {

                (model.carmodel !== '' && model.carmodel !== null && model.carmodel !== undefined) ? (
                  <>
                  <label>Car Model: {model.carmodel}</label><br />
                  </>
                ) : (null)
              }
              {

                (model.caryear !== '' && model.caryear !== null && model.caryear !== undefined) ? (
                  <>
                  <label>Car Year: {model.caryear}</label><br />
                  </>
                ) : (null)
              }
              {

                (model.cellmake !== '' && model.cellmake !== null && model.cellmake !== undefined) ? (
                  <>
                  <label>Cell Make: {model.cellmake}</label><br />
                  </>
                ) : (null)
              }
              {

                (model.cellmodel !== '' && model.cellmodel !== null && model.cellmodel !== undefined) ? (
                  <>
                  <label>Cell Model: {model.cellmodel}</label><br />
                  </>
                ) : (null)
              }
              {

                (model.cellcarrier !== '' && model.cellcarrier !== null && model.cellcarrier !== undefined) ? (
                  <>
                  <label>Cell Carrier: {model.cellcarrier}</label><br />
                  </>
                ) : (null)
              }
              {

                (model.cellos !== '' && model.cellos !== null && model.cellos !== undefined) ? (
                  <>
                  <label>Cell Operating System: {model.cellos}</label><br />
                  </>
                ) : (null)
              }
              {

                (model.gamesystem !== '' && model.gamesystem !== null && model.gamesystem !== undefined) ? (
                  <>
                  <label>Game System: {model.gamesystem}</label><br />
                  </>
                ) : (null)
              }
              {
              //  <div className="offer-button">
              //    <button onClick={() => this.onOfferSubmit(model._id)}>Make Offer</button>
              //  </div>
              }
              {
              //  <div className="save-button">
              //    <button onClick={() => this.onSaveItem(model._id)}>Save Item</button>
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
                <SaveItem model={model} userId={userId} firstName={firstName} isAuth={isAuth} /> :
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

export default CatResults;
