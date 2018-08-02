import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddPoll extends Component {
  state = {
    question: '',
    a: '',
    b: '',
    c: '',
    d: '',
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value, 
    });
  }

  isDisabled = () =>{
    return !this.state.a  || !this.state.b || !this.state.c || !this.state.d || !this.state.question; 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit ', this.state);
  }
  
  render() {
    const {question, a, b, c, d} = this.state;
    return (
      <form className='add-form' onSubmit = {this.handleSubmit}>
        <h3 style={{marginBottom: 5}}>What is your question?</h3>
        <input
          value={question}
          onChange={this.handleInput}
          className='input' 
          type='text'
          name='question'
        />
        <h3 style={{marginBottom: 5}}>What are the options?</h3>
        <label className='label' htmlFor='a'>A.</label>
        <input
          value={a}
          onChange={this.handleInput}
          className='input' 
          type='text'
          name='a'
        />
        <label className='label' htmlFor='b'>B.</label>
        <input
          value={b}
          onChange={this.handleInput}
          className='input' 
          type='text'
          name='b'
        />
        <label className='label' htmlFor='c'>C.</label>
        <input
          value={c}
          onChange={this.handleInput}
          className='input' 
          type='text'
          name='c'
        />
        <label className='label' htmlFor='d'>D.</label>
        <input
          value={d}
          onChange={this.handleInput}
          className='input' 
          type='text'
          name='d'
        />
        <button 
          className ='btn'
          type='submit'
          disabled = {this.isDisabled()}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default AddPoll;
