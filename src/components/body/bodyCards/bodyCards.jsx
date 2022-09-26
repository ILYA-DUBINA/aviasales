import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _uniqueId from 'lodash/uniqueId';

import { fetchAviasales } from '../../../store/aviasalesSlice';

import Card from './card/card';

import './bodyCards.scss';
// eslint-disable-next-line import/order
import { SpinerLoading } from '../../spinerLoading/spinerLoading';

const BodyCards = () => {
  const dispatch = useDispatch();
  const allTransfer = useSelector((state) => state.aviasales);
  const { status, error } = useSelector((state) => state.aviasales);
  let elements;

  useEffect(() => {
    dispatch(fetchAviasales());
  }, [dispatch]);

  if (allTransfer.emptyTransferArray.length !== 0) {
    elements = allTransfer.emptyTransferArray.map((item) => {
      return <Card key={_uniqueId()} {...item} />;
    });
  } else {
    elements = <h2 style={{ color: 'red' }}>Рейсов, подходящих под заданные фильтры, не найдено</h2>;
  }

  return (
    <>
      {status === 'loading' && <SpinerLoading />}
      {error && <h2 style={{ color: 'red' }}>An error occured: {error}</h2>}
      {elements}
    </>
  );
};

export default BodyCards;
