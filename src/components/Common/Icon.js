import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fa from 'font-awesome/scss/font-awesome.scss';

class Icon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    specialClass: PropTypes.string,
  }

  render() {
    let classes = [
      fa.fa, fa[`fa-${this.props.name}`], // eslint-disable-line
    ];

    if (this.props.specialClass) {
      classes = [...classes, this.props.specialClass];
    }

    return <i className={classNames(classes)} aria-hidden="true" />;
  }
}

export default Icon;
