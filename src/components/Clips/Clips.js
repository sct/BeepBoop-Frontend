import React from 'react';
import PropTypes from 'prop-types';

import api from '../../utils/api';
import s from './Clips.scss';

class Clips extends React.Component {
  static propTypes = {
    clips: PropTypes.array.isRequired,
  }

  handlePlay = (clip) => {
    api.apiRequest(`clip/${clip._id}/play`)
      .then(json => clip.success = json.message)
      .catch(e => clip.error = 'Failed');
  }

  render() {
    const { clips } = this.props;
    console.log(clips);

    return (
      <div className={s.container}>
        <div className={s.row}>
          {clips.map((clip) => (
            <a
              className={s.clipContainer}
              key={clip._id}
              onClick={() => this.handlePlay(clip)}
            >
              <div className={s.clip}>
                <h4 className={s.title}>{clip.name}</h4>
                <h6 className={s.subtitle}>Created by {clip._user}</h6>
                <p>{clip.description}</p>
                {clip.success ? (
                  <p>Played!</p>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default Clips;
