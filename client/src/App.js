import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

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

import UserPanel from './components/UserPanel';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isAuth: false,
      userName: '',
      firstName: '',
      userId: ''
    };
  }

  componentDidMount() {
      console.log('Mounting...');
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const { token } = obj;
        //Verify
        console.log('Checking Token...');
        console.log(token);
        fetch('/user/verify/' + token)
          .then(res => res.json())
          .then(json => {
            console.log(json.message);
            console.log(json.user);
            console.log(json.userName);
            console.log(json.firstName);
            if (json.message === 'User Verified') {
              console.log('Made it');
              this.setState({
                token,
                userName: json.userName,
                firstName: json.firstName,
                userId: json.userId,
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
      userId
    } = this.state;

    console.log(isAuth);
    console.log(userName);
    console.log(firstName);
    console.log(userId);

    return (
      <div className="App">
        {
          console.log('Passed Token App:', isAuth)
        }
        <Header isAuth={isAuth} userName={userName} firstName={firstName} />
        <MobileMenu />
        <SideBar />


        <div className="mycontainer">
          <BrowserRouter>
            <Switch>
              <Route exact path={'/'} component={Home} />
              <Route path={'/WhatPeopleNeed'} component={WhatPeopleNeed} />
              <Route path={'/WhatYouNeed'}
                render={(props) => <WhatYouNeed {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
              />
              <Route path={'/HowItWorks'} component={HowItWorks} />
              <Route path={'/About'} component={About} />
              <Route path={'/Contact'} component={Contact} />
              <Route path={'/Register'} component={Register} />

              <Route path={'/auto'} component={Auto} />
              <Route path={'/appliances'} component={Appliances} />
              <Route path={'/moto'} component={Moto} />
              <Route path={'/cell'} component={Cell} />
              <Route path={'/furniture'} component={Furniture} />
              <Route path={'/instruments'} component={Instruments} />
              <Route path={'/games'} component={Vidgame} />

              <Route path={'/userpanel'}
                render={(props) => <UserPanel {...props} isAuth={isAuth} userId={userId} />}
              />
            </Switch>
          </BrowserRouter>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
