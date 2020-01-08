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
  });

});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] },
  number: { currentValue: 1 },
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it('passes dummy test', () => {
      expect(1).toBe(1);
    });

    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'icons': {
        /*tests for icons*/
        it('contains divs with icon class', () => {
          const divIcon = renderedSubcomponent.find('.icon');
          expect(divIcon.length).toBe(mockProps.values.length + 1);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.icon').at(1).simulate('click');
          renderedSubcomponent.find('.icon').at(2).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(2);
        });
        break;
      }
      case 'checkboxes': {
        /*tests for checkboxes */
        it('contains one div and checkboxes', () => {
          const divCheckboxes = renderedSubcomponent.find('.checkboxes');
          const inputs = renderedSubcomponent.find('input');

          expect(divCheckboxes.length).toBe(1);
          expect(inputs.length).toBe(mockProps.values.length);
          expect(inputs.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(inputs.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run SetOrderOption function on change', () => {
          renderedSubcomponent.find(`input[value="${testValue}"]`).simulate('change', { currentTarget: { checked: true } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
        });
        break;
      }

      case 'number': {
        /*tests for number */
        it('contains div and input', () => {
          const divNumber = renderedSubcomponent.find('.number');
          const inputNumber = renderedSubcomponent.find('input[type="number"]');

          expect(divNumber.length).toBe(1);
          expect(inputNumber.length).toBe(1);
        });

        it('should run SetOrderOption function on change', () => {
          renderedSubcomponent.find('input[type="number"]').simulate('change', { currentTarget: { value: testValueNumber } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });

        break;
      }
    }
  });
}
