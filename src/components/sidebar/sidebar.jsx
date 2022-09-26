import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addClickTransfers, addFilterTransfers } from '../../store/aviasalesSlice';
import { showAllTransfer, showNonStop, showOneTransfer, showThreeTransfer, showTwoTransfer } from '../../store/const';

import './sidebar.scss';

const Sidebar = () => {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.aviasales);

  const onClickAllTransfer = () => {
    dispatch(addClickTransfers({ type: showAllTransfer }));
  };
  const onClickNonStop = () => {
    dispatch(addClickTransfers({ type: showNonStop }));
    dispatch(addFilterTransfers(0));
  };
  const onClickOneTransfer = () => {
    dispatch(addClickTransfers({ type: showOneTransfer }));
    dispatch(addFilterTransfers(1));
  };
  const onClickTwoTransfer = () => {
    dispatch(addClickTransfers({ type: showTwoTransfer }));
    dispatch(addFilterTransfers(2));
  };
  const onClickThreeTransfer = () => {
    dispatch(addClickTransfers({ type: showThreeTransfer }));
    dispatch(addFilterTransfers(3));
  };

  return (
    <div className="aviasales__content-sidebar" id="panel">
      <span> Пересадки </span>
      <div id="hidden_panel">
        <h3 className="sidebar__title">Количество пересадок</h3>
        <ul className="sidebar__list">
          <li className="sidebar__list-item">
            <input
              className={`item__radio ${
                allData.allTransfer ||
                (allData.nonStop && allData.oneTransfer && allData.twoTransfer && allData.threeTransfer)
                  ? allData.imgBackSidebar
                  : ''
              }`}
              type="checkbox"
              id="allData"
              name="happy"
              value="yes"
              onClick={onClickAllTransfer}
            />
            <label className="item__text" htmlFor="allData">
              Все
            </label>
          </li>
          <li className="sidebar__list-item">
            <input
              className={`item__radio ${allData.allTransfer || allData.nonStop ? allData.imgBackSidebar : ''}`}
              type="checkbox"
              id="without-transfers"
              name="happy"
              value="yes"
              onClick={onClickNonStop}
            />
            <label className="item__text" htmlFor="without-transfers">
              Без пересадок
            </label>
          </li>
          <li className="sidebar__list-item">
            <input
              className={`item__radio ${allData.allTransfer || allData.oneTransfer ? allData.imgBackSidebar : ''}`}
              type="checkbox"
              id="one-transplant"
              name="happy"
              value="yes"
              onClick={onClickOneTransfer}
            />
            <label className="item__text" htmlFor="one-transplant">
              1 пересадка
            </label>
          </li>
          <li className="sidebar__list-item">
            <input
              className={`item__radio ${allData.allTransfer || allData.twoTransfer ? allData.imgBackSidebar : ''}`}
              type="checkbox"
              id="two-transplant"
              name="happy"
              value="yes"
              onClick={onClickTwoTransfer}
            />
            <label className="item__text" htmlFor="two-transplant">
              2 пересадки
            </label>
          </li>
          <li className="sidebar__list-item">
            <input
              className={`item__radio ${allData.allTransfer || allData.threeTransfer ? allData.imgBackSidebar : ''}`}
              type="checkbox"
              id="three-transplant"
              name="happy"
              value="yes"
              onClick={onClickThreeTransfer}
            />
            <label className="item__text" htmlFor="three-transplant">
              3 пересадки
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
