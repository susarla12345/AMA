import React from 'react';
import { ReactComponent as Logo } from '../../public/images/logo.svg';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";


import '../../styles/common.scss'
import '../header/style.scss';

import { connect } from 'react-redux';
import { signoutUser } from '../../redux/actions/test-actions';

class Header extends React.Component {

  logout = () => {
    this.props.logout();
  }

  render() {
    console.log(this.props);
    return (
      <div className="main-header element-flex justify-content--space-between">
        <div className="left-section">
          <Logo />
        </div>
  
  
        <div className="right-section">
          { this.props.isLoggedIn ? 
            <span>
              <a className="header-item profile mr-12">profile</a>
              <a role="button" onClick={() => this.logout()}>signout</a>
            </span>  : 
          <span>
            <Link to="/signin">signin</Link>
            <Link to="/signup">signup</Link>
          </span> 
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loggedIn,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch(signoutUser()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));