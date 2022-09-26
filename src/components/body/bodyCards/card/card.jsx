/* eslint-disable prettier/prettier */
import React, {useState,useEffect} from 'react';
import _uniqueId from 'lodash/uniqueId';

import './card.scss';

const Card = (props) => {
  let [dogImage, setDogImage] = useState(null);
  const { price, carrier } = props;

  useEffect(() => {
    fetch(`https://pics.avs.io/99/36/${carrier}.png`)
      .then(response => setDogImage(response.url));      
  },[]);

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    hours = hours <= 9 ? '0' + hours : hours;
    let minutes = mins % 60;
    minutes = minutes <= 9 ? '0' + minutes : minutes;
    return hours + 'ч ' + minutes + 'м';
  }
  function getTimeFromMinsFunc(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + ':' + minutes;
  }

  const getTimePath = () => {
    return props.segments.map((item) => {
      let s = `${item.date}`;

      let d = new Date(s);

      let res = [d.getHours(), d.getMinutes()].map(function (x) {
        return x < 10 ? '0' + x : x;
      }).join(':');

      let r = getTimeFromMinsFunc(item.duration);

      let time1 = r;
      let time2 = res;
      
      let hour=0;
      let minute=0;
      
      let splitTime1= time1.split(':');
      let splitTime2= time2.split(':');
      
      hour = parseInt(splitTime1[0])+parseInt(splitTime2[0]);
      minute = parseInt(splitTime1[1])+parseInt(splitTime2[1]);
      hour = hour + minute / 60;
      hour = hour%24;
      hour = parseInt(hour);
      minute = minute%60;

      if(hour < 10){
        hour = '0' + hour;
      } 
      if(minute < 10){
        minute = '0' + minute;
      } 

      let result = `${hour}:${minute}`;

      return res + ' - ' + result;
    });
  };

  const timePath = getTimePath();
  
  return (
    <>
      <div className="body__content-cards">
        <div className="cards__header">
          <span className="cards__header-price">{price}</span>
          <div className="cards__header-image">
            <img className="price__img" src={dogImage} alt="картинка компании" />
          </div>
        </div>
        {props.segments.map((item, index) => {  
          return (
            <div className="cards__allData" key={_uniqueId()}>
              <div className="cards__allData-twoTransfer">
                <div className="twoTransfer__city">
                  <h5 className="twoTransfer__city-text">
                    {item.origin} – {item.destination}
                  </h5>
                  <p className="twoTransfer__city-time">{timePath[index]}</p>
                </div>
                <div className="twoTransfer__transit">
                  <h5 className="twoTransfer__transit-text">В пути</h5>
                  <p className="twoTransfer__transit-time">{getTimeFromMins(item.duration)}</p>
                </div>
                <div className="twoTransfer__place">
                  <h5 className="twoTransfer__place-text">
                    {item.stops.length === 0
                      ? 'БЕЗ ПЕРЕСАДОК'
                      : item.stops.length === 1
                        ? '1 ПЕРЕСАДКА'
                        : item.stops.length === 2
                          ? '2 ПЕРЕСАДКИ'
                          : item.stops.length === 3
                            ? '3 ПЕРЕСАДКИ'
                            : null}
                  </h5>
                  <p className="twoTransfer__place-time">{item.stops.join(', ')}</p>
                </div>
              </div>
            </div>
          );
        })}       
      </div>
    </>
  );
};

export default Card;
