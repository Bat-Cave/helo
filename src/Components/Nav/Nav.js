import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';


class Nav extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }


  render(){
    if (this.props.location.pathname !== '/') {
      return (
        <div className='nav-container'>
          <Link to='/dashboard'>
            <p>Home</p>
          </Link>
          <Link to='/new'>
            <p>Post</p>
          </Link>
          <Link to='/'>
            <p>Logout</p>
          </Link>
        </div>
      )
    } else {
      return null
    }
  }
}

export default withRouter(Nav);