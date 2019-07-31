import React, { Component } from 'react';
import CatResults from './CatResults';


class Auto extends Component {
  render() {
    return (
      <div className="Auto">
        <h1>Auto</h1>
        <CatResults category={'auto'}
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

export default Auto;
