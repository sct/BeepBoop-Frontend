import React from 'react';
import { connect } from 'react-redux';

import Servers from '../components/Servers/Servers';

class ServersContainer extends React.Component {

  render() {
    return <Servers {...this.props} {...this.state} />;
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(ServersContainer);
