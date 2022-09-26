import React from 'react';

import img from '../image/Logo.svg';

import Sidebar from './sidebar/sidebar';
import Body from './body/body';

import './App.scss';

const App = () => {
  return (
    <section className="container">
      <div className="container__inside">
        <div className="aviasales">
          <div className="aviasales__icon">
            <img className="aviasales__icon-img" src={img} alt="картика самолетика" />
          </div>
          <div className="aviasales__content">
            <Sidebar />
            <Body />
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
