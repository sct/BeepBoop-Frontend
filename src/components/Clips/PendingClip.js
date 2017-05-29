import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import numeral from 'numeral';

import s from './PendingClip.scss';
import { Icon } from '../Common';
import { appConfig } from '../../config';

const cx = classNames.bind(s);

class PendingClip extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  static propTypes = {
    file: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);

    this.store = context.store;

    this.state = {
      file: props.file,
      name: props.file.name,
      description: "",
      inProgress: false,
      success: false,
      failed: false,
      progress: 0,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // do form submit here
    this.uploadFile(this.state.file);
  }

  uploadFile = (file) => {
    const xhr = new XMLHttpRequest();
    const user = this.store.getState().user;

    if (xhr.upload) {
      const formData = new FormData();

      formData.append('name', this.state.name);
      formData.append('description', this.state.description);
      formData.append('clip', file);

      xhr.upload.addEventListener("progress", (e) => {
        const pc = parseInt(100 - (e.loaded / e.total * 100));
        this.setState({ progress: pc });
      }, false);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.setState({ progress: 100, success: true });
          } else {
            this.setState({ failed: true });
          }
        }
      };

      xhr.open('POST', `${appConfig.api}clip/upload`);
      xhr.setRequestHeader('Authorization', `Bearer ${user.token}`);

      this.setState({ inProgress: true }, () => xhr.send(formData));

    }
  }

  handleChange = (e, field) => {
    const newState = {};

    newState[field] = e.target.value;
    return this.setState(newState);
  }

  renderProgressBar = (p) => (
    <div className={s.progress}>
      <div
        className={cx(s.progressBar, { success: this.state.success, failed: this.state.failed })}
        role="progressbar"
        aria-valuenow={p}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: `${p}%` }}
      />
    </div>
  )

  render() {
    const { file } = this.state;

    return (
      <div className={s.clipCol}>
        <div className={cx(s.clipContainer, { success: this.state.success, failed: this.state.failed })}>
          <form className={s.clip} onSubmit={this.handleSubmit}>
            <div className={s.formGroup}>
              <label htmlFor="name">Clip Name</label>
              <input
                type="text"
                className={s.formControl}
                id="name"
                placeholder="Clip Name"
                value={this.state.name}
                onChange={(e) => this.handleChange(e, 'name')}
              />
            </div>
            <h6 className={s.subtitle}>File Size {numeral(file.size).format('0.0b')}</h6>
            <div className={s.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                className={s.formControl}
                id="description"
                name="description"
                value={this.state.description}
                placeholder="Enter a clip description"
                onChange={(e) => this.handleChange(e, 'description')}
              />
            </div>
            {!this.state.inProgress ? (
              <button type="submit" className={s.submit}>
                <Icon name="upload" /> Upload Clip
              </button>
            ) : (
              this.renderProgressBar(this.state.progress)
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default PendingClip;
