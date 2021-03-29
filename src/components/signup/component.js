import React from 'react';
import FormInput from '../form-input/component';
import FormButton from '../form-button/component';

import '../signup/styles.scss'

class SignUp extends React.Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
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

  signup = () => {
    console.log(this.state);
    console.log(this.props);
  }
  
  render() {
    return (
      <div className="sign-up-wrapper">
        <FormInput name="email" type="text" placeholder="enter your email" onChange={(event) => this.changeEmail(event)}/>
        <FormInput name="password" type="text" placeholder="enter password" onChange={(event) => this.changePassword(event)}/>

        <FormButton name="signin" buttonClass="button button--primary" onClick={() => this.signup()}> Signup </FormButton>
      </div>
    )
  }
}

export default SignUp;