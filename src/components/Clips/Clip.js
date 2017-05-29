import React from 'react';
import PropTypes from 'prop-types';

import s from './Clip.scss';
import api from '../../utils/api';
import { Icon } from '../Common';

class Clip extends React.Component {
  static propTypes = {
    clip: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      failed: false,
    };
  }

  handlePlay = () => {
    const { clip } = this.props;

    api.apiRequest(`clip/${clip._id}/play`)
      .then(() => {
        this.setState({ isPlaying: true }, () => {
          setTimeout(this.finishPlay, 2000);
        });
      })
      .catch(() => this.setState({ failed: true }));
  }

  finishPlay = () => {
    this.setState({ isPlaying: false });
  }

  render() {
    const { clip } = this.props;
    const { isPlaying } = this.state;

    return (
      <div className={s.clipCol}>
        <div className={s.clipContainer}>
          <div className={s.clip}>
            <h4 className={s.title}>{clip.name}</h4>
            <h6 className={s.subtitle}>Created by {clip._user.username}</h6>
            <p>{clip.description}</p>
          </div>
          <div className={s.clipFooter}>
            <button onClick={this.handlePlay} className={s.play}>
              <Icon name="play" /> {isPlaying ? 'Playing...' : 'Play'}
            </button>
            <button className={s.delete}>
              <Icon name="trash" />
            </button>
            <button className={s.edit}>
              <Icon name="pencil" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Clip;
