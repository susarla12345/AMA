import React from 'react';
import FormInput from '../form-input/component';
import FormButton from '../form-button/component';

import '../signin/style.scss'

import { connect } from 'react-redux';
import { loginUsingEmailAndPassword } from '../../redux/actions/test-actions';

class Signin extends React.Component {

  // componentDidUpdate(prevProps) {
  //   debugger;
  //   if(this.props.isLoggedIn !== prevProps.isLoggedIn) {
  //     this.setState({
  //       ...this.state,
  //       isLoggedIn: this.props.isLoggedIn
  //     });
  //   }
  // }

  // componentDidMount() {
  //   if(this.state.isLoggedIn) {
  //     this.props.history.push('/questions');
  //   }
  // }

  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
    }
  }

  changeEmail = event => {
    let object = Object.assign({}, this.state, { email: event.target.value});
    this.setState(object);
  }

  changePassword = event => {
    let object = Object.assign({}, this.state, { password: event.target.value});
    this.setState(object);
  }

  login = () => {
    this.props.login(this.state)
  }

  render() {
    if(this.props.isLoggedIn) {
      this.props.history.push('/questions');
    }
    return (
      <div className="signin-wrapper">
        <FormInput name="email" type="text" placeholder="enter your email" onChange={(event) => this.changeEmail(event)}/>
        <FormInput name="password" type="text" placeholder="enter password" onChange={(event) => this.changePassword(event)}/>

        <FormButton name="signin" buttonClass="button button--primary" onClick={() => this.login()}> Login </FormButton>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.loggedIn,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (payload) => dispatch(loginUsingEmailAndPassword(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);