import React from 'react';
import styles from './OrderOption.scss';
//import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class OrderOptionDate extends React.Component {
  state = {
    startDate: new Date(),
  };

  handleChange = date => {
    this.setState({
      startDate: date,
    });
  };

  render() {
    const ExampleCustomInput = ({ value, onClick }) => (
      <button className={styles.dateinput} onClick={onClick}>
        {value}
      </button>
    );
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        customInput={<ExampleCustomInput />}
      />
    );
  }
}

export default OrderOptionDate;
