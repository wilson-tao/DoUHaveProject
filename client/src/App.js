import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import {
  getFromStorage,
  setInStorage,
} from './util/storage';

import Header from './components/Header';
import SideBar from './components/SideBar';
import MobileMenu from './components/MobileMenu';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import WhatPeopleNeed from './components/WhatPeopleNeed';
import WhatYouNeed from './components/WhatYouNeed';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import Register from './components/Register';

import Auto from './components/Auto';
import Appliances from './components/Appliances';
import Moto from './components/Moto';
import Cell from './components/Cell';
import Furniture from './components/Furniture';
import Instruments from './components/Instruments';
import Vidgame from './components/Vidgame';
import HomeService from './components/HomeService';
import AutoService from './components/AutoService';
import Clothing from './components/Clothing';
import Misc from './components/Misc';
import Collectibles from './components/Collectibles';
import ComEquip from './components/ComEquip';
import Housing from './components/Housing';
import Beauty from './components/Beauty';

import UserPanel from './components/UserPanel';

import Search from './components/Search';
import SearchResults from './components/SearchResults';
import AdvancedSearch from './components/AdvancedSearch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isAuth: false,
      userName: '',
      firstName: '',
      userId: '',
      email: '',
      searchTerm: '',
      searchResults: [],
      showResults: false
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onTextChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onSearch() {
    const {
      searchTerm,
      searchResults,
      showResults
    } = this.state;

    if(!showResults) {
      this.setState({
        showResults:true
      });
    }

    console.log("Search Term:", searchTerm);

    fetch('items/search2/' + searchTerm, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log("Search Response:", json);
        if (json.count > 0) {
          this.setState({
            searchResults: json.items
          });

        }
      });
  }

  componentDidMount() {
      console.log('Mounting APP');
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const { token } = obj;
        //Verify
        console.log('Checking Token...');

        fetch('/user/verify/' + token)
          .then(res => res.json())
          .then(json => {

            if (json.message === 'User Verified') {
              console.log('TOKEN VERIFIED');
              this.setState({
                token,
                userName: json.userName,
                firstName: json.firstName,
                userId: json.userId,
                email: json.email,
                isAuth: true
              });
            } else {
              this.setState({
                isAuth: false,
              });
            }
          });
      } else {
        console.log('No Token');
        this.setState({
          isAuth: false,
        });
      }
    }

  render() {
    const {
      isAuth,
      userName,
      firstName,
      userId,
      searchTerm,
      searchResults,
      showResults,
      token,
      email
    } = this.state;



    return (
      <div className="App">

        <Header isAuth={isAuth} userName={userName} firstName={firstName} />
        <MobileMenu />


        <div className="Search">
          <input type="text" placeholder="Search" value={searchTerm} onChange={this.onTextChange} /><button onClick={this.onSearch}>Search</button>

        </div>
        <SideBar />


        <div className="mycontainer">

          {
            this.state.showResults ?
            <SearchResults isAuth={isAuth} userId={userId} searchResults={searchResults} token={token} /> :
            (
              <BrowserRouter>
                <Switch>
                  <Route exact path={'/'} component={Home} />
                  <Route path={'/WhatPeopleNeed'}
                    render={(props) => <WhatPeopleNeed {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/WhatYouNeed'}
                    render={(props) => <WhatYouNeed {...props} isAuth={isAuth} email={email} userName={userName} firstName={firstName} userId={userId} token={token} />}
                  />
                  <Route path={'/HowItWorks'} component={HowItWorks} />
                  <Route path={'/About'} component={About} />
                  <Route path={'/Contact'} component={Contact} />
                  <Route path={'/Register'} component={Register} />

                  <Route path={'/auto'}
                    render={(props) => <Auto {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/appliances'}
                    render={(props) => <Appliances {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/moto'}
                    render={(props) => <Moto {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/cell'}
                    render={(props) => <Cell {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/furniture'}
                    render={(props) => <Furniture {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/instruments'}
                    render={(props) => <Instruments {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/games'}
                    render={(props) => <Vidgame {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />

                  <Route path={'/homeservice'}
                    render={(props) => <HomeService {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/autoservice'}
                    render={(props) => <AutoService {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/clothing'}
                    render={(props) => <Clothing {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/misc'}
                    render={(props) => <Misc {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/collectibles'}
                    render={(props) => <Collectibles {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/comequip'}
                    render={(props) => <ComEquip {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/housing'}
                    render={(props) => <Housing {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />
                  <Route path={'/beauty'}
                    render={(props) => <Beauty {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
                  />

                  <Route path={'/userpanel'}
                    render={(props) => <UserPanel {...props} isAuth={isAuth} userId={userId} token={token} />}
                  />

                  <Route path={'/advanced'}
                    render={(props) => <AdvancedSearch {...props} isAuth={isAuth} userId={userId} token={token} />}
                  />

                </Switch>
              </BrowserRouter>
            )
          }


          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
