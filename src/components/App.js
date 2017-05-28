import React from 'react';
import PropTypes from 'prop-types';
import { appConfig } from '../config';

import Header from './Layout/Header';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };
  }

  toggleMenu = () => {
    return this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
