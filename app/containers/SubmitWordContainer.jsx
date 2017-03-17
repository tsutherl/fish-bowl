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
    return (
      <SubmitWord user={this.props.user.id} submitWord={this.props.submitWord}/>
    );
  }
}

export default connect(
  ({user}) => ({user}),
  (dispatch) => ({
    submitWord: (userId, word) => submitWord
  })
)(SubmitWordContainer)


