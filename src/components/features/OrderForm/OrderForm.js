import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import pricing from '../../../data/pricing.json';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';


const OrderForm = ({ tripCost, options, setOrderOption }) => (
  <Row>
    {pricing.map(option => (
      <Col key={option.id} md={5}>
        <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options} ></OrderSummary>
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
