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

  useEffect(() => {
    dispatch(fetchAviasales());
  }, [dispatch]);

  let elements = allTransfer.emptyTransferArray.map((item) => {
    return <Card key={_uniqueId()} {...item}></Card>;
  });

  return (
    <>
      {status === 'loading' && <SpinerLoading />}
      {error && <h2 style={{ color: 'red' }}>An error occured: {error}</h2>}
      {elements}
    </>
  );
};

export default BodyCards;
