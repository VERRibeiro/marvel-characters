/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import heroIcon from '../../assets/ic_heroi.svg';

import './OrderByName.sass';

function OrderByName({ onClickOrderByName }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onClickOrderByName(!isChecked);
  };

  return (
    <div className="orderByNamecontainer">
      <img src={heroIcon} alt="hero Icon" className="heroIcon" />

      <p>Ordenar por nome - A/Z</p>

      <div
        role="button"
        tabIndex={0}
        className={`toggleSwitch ${isChecked ? 'on' : 'off'}`}
        onClick={handleToggle}
      >
        <div className="slider" />
      </div>

    </div>
  );
}

OrderByName.propTypes = {
  onClickOrderByName: PropTypes.func.isRequired,
};
export default OrderByName;
