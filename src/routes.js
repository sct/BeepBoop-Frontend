import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import UploadClip from './components/Clips/UploadClip';
import ClipsContianer from './containers/ClipsContainer';
import NotFoundPage from './components/NotFoundPage';
import Login from './components/Login';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="clips" component={ClipsContianer} />
    <Route path="clips/upload" component={UploadClip} />
    <Route path="login" component={Login} />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
