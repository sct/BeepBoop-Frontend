import React from 'react';
import PropTypes from 'prop-types';

import s from './Server.scss';
import { appConfig } from '../../config';

class Server extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    server: PropTypes.object,
    serverId: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
  }

  render() {
    const { user, serverId, server, isLoading } = this.props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const guild = user.guilds.find(g => g.id === serverId);

    console.log(server);

    if (server.uninitialized) {
      return (
        <div className={s.server}>
          <p>This server is not initialized. <a href={`${appConfig.api}server/${serverId}/join`}>Click Here</a> to begin.</p>
        </div>
      );
    }

    return (
      <div className={s.server}>
        <h3 className={s.title}>{guild.name}</h3>

      </div>
    );
  }
}

export default Server;
