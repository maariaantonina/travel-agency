import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  it('should render without crashing', () => {
    const tagVariants = ['a', 'b', 'c'];
    const component = shallow(<TripSummary tags={tagVariants} />);
    expect(component).toBeTruthy();
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should generate a link to correct address', () => {
    const expectedId = 'abc';
    const expectedLink = '/trip/abc';
    const tagVariants = ['a', 'b', 'c'];
    const component = shallow(<TripSummary id={expectedId} tags={tagVariants} />);
    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it('should render correct image src and alt values', () => {
    const expectedImage = 'image.jpg';
    const expectedDescription = 'beautiful landscape';
    const tagVariants = ['a', 'b', 'c'];

    const component = shallow(<TripSummary image={expectedImage} name={expectedDescription} tags={tagVariants} />);

    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedDescription);
  });


  it('renders correctly props: name, cost, days', () => {
    const expectedName = 'beautiful landscape';
    const expectedCost = '123';
    const expectedDays = 123;
    const tagVariants = ['a', 'b', 'c'];
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} tags={tagVariants} />);

    const targetCost = '123 days';
    const targetDays = 'from 123';
    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details').children().first().text()).toEqual(targetCost);
    expect(component.find('.details').children().last().text()).toEqual(targetDays);

    console.log(component.debug());
  });

});
