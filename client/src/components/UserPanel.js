import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserInfo from './UserInfo';
import UserOffers from './UserOffers';
import UserSaveList from './UserSaveList';
import UserItems from './UserItems';
import ItemsPostedTab from '../img/Tabs- Items You Posted.png';
import SavedPostsTab from '../img/Tabs- Saved Posts- Gold.png';
import MessagesTab from '../img/Tabs- Messages.png';

class UserPanel extends Component {




  render() {
    let isAuth = this.props.isAuth;
    let userId = this.props.userId;
    let token = this.props.token;
	 let firstName = this.props.firstName;
	 
    if (isAuth) {

      return (
        <div style={{textAlign:'center', marginLeft:'300px'}} className="UserPanel">
		  <UserInfo userId={userId} token={token} />
          <hr style={{
            backgroundColor:'#000000',
			width: '90%',
			marginTop: '30px'
        }} />
		<hr style={{
			backgroundColor:'#000000',
            width: '60%'
        }} />
			<Container style={{textAlign: 'left'}}>
				<Row style={{width:'440px', marginBottom:'-5px'}}>
					<Col style={{padding:'0px'}}><img style={{height:'40px', width:'150px'}} src={ItemsPostedTab} alt="ItemsPosted" /></Col>
					<Col style={{padding:'0px', marginLeft:'-20px'}}><img style={{height:'40px', width:'150px'}} src={SavedPostsTab} alt="SavedPosts" /></Col>
					<Col style={{padding:'0px', marginLeft:'-20px'}}><img style={{height:'40px', width:'150px'}} src={MessagesTab} alt="Messages" /></Col>
				</Row>
			</Container>
          <UserItems userId={userId} token={token} />
          <UserSaveList userId={userId} token={token} />
          

        </div>
      );
    } else {
      return (
        <h1 style={{paddingLeft: '275px'}}>Please Log In...</h1>
      );
    }

  }
}

export default UserPanel;
