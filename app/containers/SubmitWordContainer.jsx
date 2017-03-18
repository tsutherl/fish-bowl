import axios from 'axios'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SubmitWord} from '../components/SubmitWord.jsx'
import manager from 'APP/utils/manager'

const {submitWord} = manager


export class SubmitWordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log('THIS DOT PROPS', this.props)
    return (
      <SubmitWord user={this.props.user} submitWord={this.props.submitWord}/>
    );
  }
}

export default connect(
  ({user}) => ({user}),
  (dispatch) => ({
    submitWord: (userId, word) => submitWord(userId, word)
  })
)(SubmitWordContainer)


