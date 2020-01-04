import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {

  it('should render', () => {
    expect(shallow(<OrderOption />)).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should render name prop in the title', () => {
    const expectedName = 'abc';
    const component = shallow(<OrderOption type={'date'} name={expectedName} />);

    expect(component.find('.title').text()).toEqual(expectedName);
    console.log(component.debug());
  });

});
