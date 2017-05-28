import React from 'react';

import { appConfig } from '../config';
import s from './HomePage.scss';

const HomePage = () => {
  return (
    <div>
      <div className={s.jumbotron}>
        <div className={s.container}>
          <h1 className={s.title}>BeepBoopBot</h1>
          <p>Want to make your voice chat a little more exciting? What about a soundboard bot? BeepBoopBot provides just that. Add it to any Discord server in a few clicks and begin playing sound clips in your voice channels!</p>
          <p><a href={`${appConfig.api}auth/discord`} className={s.btn}>Get Started</a></p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
