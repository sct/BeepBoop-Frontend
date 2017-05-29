import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { Icon } from '../Common';
import Clip from './Clip';
import s from './Clips.scss';

class Clips extends React.Component {
  static propTypes = {
    clips: PropTypes.array.isRequired,
  }

  render() {
    const { clips } = this.props;

    return (
      <div className={s.container}>
        <div className={s.row}>
          <form className={s.formSearch}>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search clips..."
              className={s.search}
            />
          </form>
          <Link to="/clips/upload" className={s.create}>
            <Icon name="upload" /> Upload Clip
          </Link>
        </div>
        <div className={s.row}>
          {clips.map((clip) => (
            <Clip clip={clip} key={clip._id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Clips;
