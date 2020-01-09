import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import pricing from '../../../data/pricing.json';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';

import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';

import settings from '../../../data/settings';

const sendOrder = (trip, options, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...trip,
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function (response) {
      return response.json();
    }).then(function (parsedResponse) {
      console.log('parsedResponse', parsedResponse);
    });
};

const isValid = (trip, options, tripCost) => {
  const { name, contact } = options;
  if (name != '' && contact != '') {
    sendOrder(trip, options, tripCost);
  } else { window.alert('Fill in name and contact fields'); }
};

const OrderForm = ({ trip, tripCost, options, setOrderOption }) => {
  console.log(options);
  return (
    <Row>
      {pricing.map(option => (
        <Col key={option.id} md={5}>
          <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary tripCost={tripCost} options={options} ></OrderSummary>
        <Button onClick={() => isValid(trip, options, tripCost)}>Order now!</Button>
      </Col>
    </Row>);
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  trip: PropTypes.object,
};

export default OrderForm;
