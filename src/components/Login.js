import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { doLogin } from '../actions/user';

class Login extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    user: PropTypes.object,
    doLogin: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { location: { query } } = this.props;

    if (query.token && query.expiresAt) {
      this.props.doLogin(query.token, query.expiresAt);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.router.push('/');
    }
  }

  render() {
    return (
      <div>Logging in...</div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  isFetching: state.user.isFetching,
  token: state.user.token,
})

const mapDispatchToProps = (dispatch) => ({
  doLogin: (token, expires) => dispatch(doLogin(token, expires)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
