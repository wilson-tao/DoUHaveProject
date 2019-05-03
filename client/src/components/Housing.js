import React, { Component } from 'react';
import CatResults from './CatResults';


class Housing extends Component {
  render() {
    return (
      <div className="Housing">
        <h1>Housing & Places to Live</h1>
        <CatResults category={'housing'}
                    isAuth={this.props.isAuth}
                    userName={this.props.userName}
                    firstName={this.props.firstName}
                    userId={this.props.userId}
         />
      </div>
    );
  }
}

export default Housing;
