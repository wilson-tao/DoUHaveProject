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
import HomeService from './components/HomeService';
import AutoService from './components/AutoService';
import Clothing from './components/Clothing';
import Misc from './components/Misc';

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

    console.log("App.js isAuth:", isAuth);
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
              <Route path={'/WhatPeopleNeed'}
                render={(props) => <WhatPeopleNeed {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
              />
              <Route path={'/WhatYouNeed'}
                render={(props) => <WhatYouNeed {...props} isAuth={isAuth} userName={userName} firstName={firstName} userId={userId} />}
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
