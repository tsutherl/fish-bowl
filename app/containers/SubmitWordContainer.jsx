import axios from 'axios'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SubmitWord} from '../components/SubmitWord.jsx'

export class SubmitWordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <SubmitWord user={this.props.user} submitWord={this.props.submitWord}/>
    );
  }
}

export default connect(
  ({user}) => ({user}),
  (dispatch) => ({
    submitWord: (word) => {
      dispatch(submitWord(word))
    } 
  })
)(SubmitWordContainer)


