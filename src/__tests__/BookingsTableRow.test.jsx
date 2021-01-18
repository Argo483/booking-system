import React from 'react';
import renderer from 'react-test-renderer';
import BookingsTableRow from '../BookingsTableRow';

it('renders correctly', () => {
  const tree = renderer
    .create(<BookingsTableRow></BookingsTableRow>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});