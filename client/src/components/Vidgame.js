import React, { Component } from 'react';
import CatResults from './CatResults';

class Vidgame extends Component {
  render() {
    return (
      <div className="Vidgame">
        <h1>Video Games</h1>
        <CatResults category={'game'}
                    isAuth={this.props.isAuth}
                    userName={this.props.userName}
                    firstName={this.props.firstName}
                    userId={this.props.userId}
         />
      </div>
    );
  }
}

export default Vidgame;
