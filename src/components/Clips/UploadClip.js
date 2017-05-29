import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import s from './UploadClip.scss';
import PendingClip from './PendingClip';

const ACCEPTED_FILES = "audio/mpeg, audio/x-mpeg-3, audio/mp3";

class UploadClip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accepted: [],
      rejected: [],
    };
  }

  render() {
    const { accepted } = this.state;
    return (
      <div className={s.container}>
        <h1 className={s.pageTitle}>Upload Clip</h1>
        <div className={s.row}>
          <div className={s.col}>
            <p className={s.lead}>Drag sound files into the area to upload new clips to BeepBoopBot.</p>
            <div className={s.dropzone}>
              <Dropzone
                accept={ACCEPTED_FILES}
                onDrop={(accepted, rejected) => { this.setState({ accepted, rejected })}}
              >
                Try dropping some files here, or click to select files to upload.
              </Dropzone>
            </div>
          </div>
        </div>
        {accepted.length > 0 ? (
          <div className={s.row}>
            {accepted.map((f, i) => (
              <PendingClip file={f} key={`pending-file-${i}`} />
            ))}
          </div>
        ) : null}
      </div>
    )
  }
}

export default UploadClip;
