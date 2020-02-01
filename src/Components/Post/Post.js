import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Post extends Component {
  constructor(props){
    super(props)

    this.state = {
      postTitle: '',
      postImage: '',
      postContent: '',
      postAuthor: '',
      postAuthorPic: ''
    }
  }

  componentDidMount() {
    console.log(this.props)
    axios.get(`/api/post/${this.props.match.params.id}`)
      .then(res => {
        const {title, img, content, username, profile_pic} = res.data[0];
        console.log(res.data);
        this.setState({ 
          postTitle: title, 
          postImage: img,
          postContent: content,
          postAuthor: username,
          postAuthorPic: profile_pic
        })
      })
  }

  delete = () => {
    axios.delete(`/api/post/${this.props.match.params.id}`)
    .then(res => this.props.history.push('/dashboard'))
  }

  render(){
    return(
      <div className='container'>
        <div className='post-box'>
          <div className='post-header'>
            <h3>{this.state.postTitle}</h3>
            <div className='author-container'>
              <p>by: {this.state.postAuthor}</p>
              <img src={this.state.postAuthorPic} alt={this.state.postAuthor} />
            </div>
          </div>
          <div className='post-content'>
            <img src={this.state.postImage || 'https://screenshotlayer.com/images/assets/placeholder.png'} alt='post content'/>
            <p>{this.state.postContent}</p>
          </div>
          <button onClick={this.delete}>Delete Post</button>  
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Post);