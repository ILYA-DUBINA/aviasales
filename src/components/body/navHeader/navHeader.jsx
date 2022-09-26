import React from 'react';
import { useDispatch } from 'react-redux';

import { searchCheapestTicket, searchFastestTicket, searchOptimalTicket } from '../../../store/aviasalesSlice';

import './navHeader.scss';

const NavHeader = () => {
  const dispatch = useDispatch();

  const onSearchTiket = () => {
    dispatch(searchCheapestTicket());
  };
  const onSearchFastestTiket = () => {
    dispatch(searchFastestTicket());
  };
  const onSearchOptimalTiket = () => {
    dispatch(searchOptimalTicket());
  };

  return (
    <nav className="body__header">
      <a className="link__item" href="#" onClick={onSearchTiket}>
        Самый дешевый
      </a>
      <a className="link__item" href="#" onClick={onSearchFastestTiket}>
        Самый быстрый
      </a>
      <a className="link__item" href="#" onClick={onSearchOptimalTiket}>
        Оптимальный
      </a>
    </nav>
  );
};

export default NavHeader;
