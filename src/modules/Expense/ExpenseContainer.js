import React from 'react';
import { compose, withState } from 'recompose';

import ExpenseScreen from './ExpenseView';


const listData = [
  {
    id: 1,
    brand: 'Citizen',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Limited Edition',
    price: '$129.99',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image:
      'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
  },
  ];

export default compose(
  withState('tabIndex', 'setTabIndex', 0),
  withState('tabs', 'setTabs', ['NEW','VERIFIED']),
  withState('data', 'setData', listData),
)(ExpenseScreen);
