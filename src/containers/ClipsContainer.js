import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Clips from '../components/Clips/Clips';
import api from '../utils/api';

class ClipsContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.store = context.store;
    this.state = {
      isLoading: false,
      clips: [],
    };
  }

  async componentWillMount() {
    const user = this.store.getState().user;
    await this.setState({ isLoading: true });

    api.setAuthToken(user.token).apiRequest('clip')
      .then(json => this.setState({ clips: json, isLoading: false }))
      .catch(e => this.setState({ isLoading: false }));
  }

  render() {
    return <Clips {...this.state} />;
  }
}

export default ClipsContainer;
