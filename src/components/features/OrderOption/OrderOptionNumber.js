import React from 'react';
import PropTypes from 'prop-types';

import styles from './OrderOption.scss';

import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionNumber = ({ currentValue, limits, setOptionValue, price }) => (

  < div className={styles.number} >
    <input
      type="number"
      className={styles.inputSmall}
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={event => setOptionValue(parseInt(event.currentTarget.value))}
    >
    </input>
    ({formatPrice(price)})
  </div >
);

OrderOptionNumber.propTypes = {
  currentValue: PropTypes.number,
  limits: PropTypes.object,
  setOptionValue: PropTypes.func,
  price: PropTypes.string,
};

export default OrderOptionNumber;
