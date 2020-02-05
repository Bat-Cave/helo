import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import {updateUser} from '../../dux/reducer';


class Nav extends Component {

  getMe(){
    axios.get('/api/auth/me').then(res => {
      this.props.updateUser(res.data)
    })
  }

  componentDidMount(){
    this.getMe();
  }
  
  componentDidUpdate(){
    this.getMe();
  }

  logout(){
    axios.post('/api/auth/logout');
  }

  render(){
    if (this.props.location.pathname !== '/') {
      return (
        <div className='nav-container'>
          <div className='nav-top'>
            <img src={this.props.profile_pic || 'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'} alt='Profile Pic'/>
            <p>Hello, {this.props.username}!</p>
            <Link to='/dashboard'>
              <p>Home</p>
            </Link>
            <Link to='/new'>
              <p>Post</p>
            </Link>
          </div>
          <Link to='/' onClick={this.logout}>
            <p>Logout</p>
          </Link>
        </div>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect( mapStateToProps, {updateUser})(Nav));