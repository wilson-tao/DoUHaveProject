import React, { Component } from 'react';
import CatResults from './CatResults';


class Clothing extends Component {
  render() {
    return (
      <div className="Clothing">
        <h1>Clothing, Apparel, & Accessories</h1>
        <CatResults category={'clothing'}
                    isAuth={this.props.isAuth}
                    userName={this.props.userName}
                    firstName={this.props.firstName}
                    userId={this.props.userId}
         />
      </div>
    );
  }
}

export default Clothing;
