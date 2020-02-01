import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import {updateUser} from '../../dux/reducer';


class Nav extends Component {
  constructor(props){
    super(props)

    this.state = {
      
    }
  }

  componentDidMount(){
    axios.get('/api/auth/me').then(res => {
      console.log(res.data);
      this.props.updateUser(res.data)
    })
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