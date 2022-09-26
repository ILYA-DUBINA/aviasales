import React from 'react';

import NavHeader from './navHeader/navHeader';
import BodyCards from './bodyCards/bodyCards';

import './body.scss';

const Body = () => {
  return (
    <div className="aviasales__content-body">
      <NavHeader />
      <div className="dody__content">
        <BodyCards />
      </div>
    </div>
  );
};

export default Body;
