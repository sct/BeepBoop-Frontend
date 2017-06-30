import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import s from './Servers.scss';
import { discordConfig } from '../../config';

class Servers extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.node,
  }

  render() {
    const { user } = this.props;

    return (
      <div className={s.container}>
        <div className={s.row}>
          <div className={s.sidebar}>
            <ul className={s.serverNav}>
              <h5>Available Servers</h5>
              <li className={s.serverItem}>
                {user ? user.guilds.filter(g => (g.permissions & 0x00000020) === 0x00000020)
                    .map(guild => (
                  <Link
                    to={`/servers/${guild.id}`}
                    className={s.serverLink}
                    activeClassName={s.active}
                    key={`server-nav-${guild.id}`}
                  >
                    <img
                      className={s.icon}
                      src={`${discordConfig.serverUrl}${guild.id}/${guild.icon}.png?size=32`}
                    />
                    {guild.name}
                  </Link>
                )) : null}
              </li>
            </ul>
          </div>
          <div className={s.server}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Servers;
