import React from 'react';
import PropTypes from 'prop-types';

import s from './Clip.scss';
import api from '../../utils/api';

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
      <a
        className={s.clipContainer}
        onClick={this.handlePlay}
      >
        <div className={s.clip}>
          <h4 className={s.title}>{clip.name}</h4>
          <h6 className={s.subtitle}>Created by {clip._user}</h6>
          <p>{clip.description}</p>
          {isPlaying ? (
            <p>Sent clip request...</p>
          ) : null}
        </div>
      </a>
    );
  }
}

export default Clip;
