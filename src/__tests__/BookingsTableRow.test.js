import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import { BookingsTableRow } from '../BookingsTableRow';

it('renders correctly', () => {
  const tree = renderer
    .create(<BookingsTableRow hourToRender={moment("20111031", "YYYYMMDD")} calendarDay={{bookingsOnThisDay: [], csvBookingsOnThisDay: []}}></BookingsTableRow>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});