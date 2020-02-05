import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state = {
      search: '',
      mine: true,
      posts: []
    }
  }

  handleSearch(name, val){
    this.setState({[name]: val})
  }

  handleChecked = () => {
    if(this.state.mine){
      this.setState({mine: false})
    } else {
      this.setState({mine: true});
    }
  }

  componentDidMount(){
    this.getPosts();
  }

  getPosts = () => {
    let { search, mine } = this.state;
    let url = '/api/posts';
    if (mine && !search) {
      url += '?mine=true';
      console.log('Getting My Posts')
    } else if (!mine && search) {
      url += `?search=${search}`;
    } else if (mine && search) {
      url += `?mine=true&search=${search}`;
    }
    axios.get(url)
    .then(res => {
      this.setState({ posts: res.data , search: ''})
      console.log(res.data)
      })
  }

  reset = () => {
    let url = '/api/posts';
    this.setState({mine: false, search: ''})
    axios.get(url)
      .then(res => {
        this.setState({ posts: res.data, search: '' })
      })
  }

  render(){
    let posts = this.state.posts.map((post) => {
      return(
        <Link to={`/post/${post.id}`} key={post.id}>
        <div className='post'>
          <h3>{post.title}</h3>
          <div className='author-container'>
            <p>by {post.username}</p>
            <img src={post.profile_pic || 'https://www.sackettwaconia.com/wp-content/uploads/default-profile.png'} alt='author' />
          </div>
        </div>
      </Link>
      )
    })

    return(
      <div className='container'>
        <div className='dashboard-search'>
          <input type='text' name='search' value={this.state.search} onChange={e => this.handleSearch(e.target.name, e.target.value)}/>
          <button onClick={this.getPosts}>Search</button>
          <button onClick={this.reset}>Reset</button>
          <div className='my-posts'>
            <p>My Posts</p>
            <input type='checkbox' checked={this.state.mine} onChange={this.handleChecked}/>
          </div>
        </div>
        <div className='dashboard-posts'>
          {posts}
        </div>
      </div>
    )
  }
}

export default Dashboard;