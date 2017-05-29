import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

import s from './Header.scss';
import logo from '../../assets/images/beepboopbot.svg';
import { appConfig, discordConfig } from '../../config';

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props;

    return (
      <nav className={s.navbar}>
        <IndexLink to="/" className={s.navbarBrand}>
          <img src={logo} width={30} height={30} alt="BeepBoopBot" className={s.logo} />
        </IndexLink>
        <div className={s.navWrapper}>
          <div className={s.navbarMain}>
            <Link to="/servers" className={s.link} activeClassName={s.active}>My Servers</Link>
            <Link to="/clips" className={s.link} activeClassName={s.active}>My Clips</Link>
          </div>
          <div className={s.navbarNav}>
            {user ? (
              <div className={s.userContainer}>
                <img src={`${discordConfig.avatarUrl}${user.id}/${user.avatar}.png?size=32`} className={s.avatar} />
                {user.username}
              </div>
            ) : (
              <a href={`${appConfig.api}auth/discord`} className={s.link}>Login</a>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Header);
