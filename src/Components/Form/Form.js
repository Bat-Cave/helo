import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Form extends Component {
  constructor(props){
    super(props)

    this.state = {
      titleInput: '',
      imgInput: '',
      contentInput: ''
    }
  }

  handleInput(name, val){
    this.setState({[name]: val})
  }

  createPost = () =>{
    const {titleInput, imgInput, contentInput} = this.state;
    axios.post(`/api/new/${this.props.id}`, {titleInput, imgInput, contentInput})
    .then(res => this.props.history.push('/dashboard'))
    .catch(err => {
      console.log(err)
    })
  }

  render(){
    console.log(this.props);
    return(
      <div className='container'>
        <div className='form-box'>
          <h2>New Post</h2>
          <div className='input-line'>
            <p>Title:</p>
            <input 
              value={this.state.titleInput} 
              type='text' 
              name='titleInput' 
              onChange={e => this.handleInput(e.target.name, e.target.value)}/>
          </div>
          <div className='image-preview'>
            <img src={this.state.imgInput || 'https://screenshotlayer.com/images/assets/placeholder.png'} alt='asd' />
          </div>
          <div className='input-line'>
            <p>Image URL:</p>
            <input 
              value={this.state.imgInput}
              type='text' 
              name='imgInput' 
              onChange={e => this.handleInput(e.target.name, e.target.value)}/>
          </div>
          <div className='input-line'>
            <p>Content:</p>
            <input 
              value={this.state.contentInput} 
              type='text' 
              name='contentInput' 
              onChange={e => this.handleInput(e.target.name, e.target.value)}/>
          </div>
          <button onClick={this.createPost}>Post</button>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Form);