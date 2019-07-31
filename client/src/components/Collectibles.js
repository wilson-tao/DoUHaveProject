import React, { Component } from 'react';
import CatResults from './CatResults';


class Collectibles extends Component {
  render() {
    return (
      <div className="Collectibles">
        <h1>Antiques & Collectibles</h1>
        <CatResults category={'collectible'}
                    isAuth={this.props.isAuth}
                    userName={this.props.userName}
                    firstName={this.props.firstName}
                    userId={this.props.userId}
                    token={this.props.token}
         />
      </div>
    );
  }
}

export default Collectibles;
