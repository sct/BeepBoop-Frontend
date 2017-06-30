import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Server from '../components/Servers/Server';
import api from '../utils/api';

class ServerContainer extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      server: null,
      serverId: null,
      isLoading: false,
      error: null,
    };
  }

  componentWillMount() {
    this.fetchServer(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.serverId !== nextProps.params.id) {
      this.fetchServer(nextProps.params.id);
    }
  }

  async fetchServer(id) {
    await this.setState({ serverId: id, isLoading: true });

    api.apiRequest(`server/${id}`)
      .then(json => this.setState({ server: json, isLoading: false }))
      .catch(e => this.setState({ error: e, isLoading: false }));
  }

  render() {
    return <Server {...this.props} {...this.state} />;
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(ServerContainer);
