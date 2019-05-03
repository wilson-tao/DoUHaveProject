import React, { Component } from 'react';
import CatResults from './CatResults';


class Beauty extends Component {
  render() {
    return (
      <div className="Beauty">
        <h1>Beauty & Cosmetics</h1>
        <CatResults category={'beauty'}
                    isAuth={this.props.isAuth}
                    userName={this.props.userName}
                    firstName={this.props.firstName}
                    userId={this.props.userId}
         />
      </div>
    );
  }
}

export default Beauty;
