import moment from 'moment';

export default [
  {
    id: '1',
    description: 'Rent',
    amount: 1000,
    createdAt: 0,
    note: 'This is my rent'
  },
  {
    id: '2',
    description: 'Coffee',
    amount: 2.50,
    note:'This is some good coffee',
    createdAt: moment(0).subtract(4, 'days').valueOf()
  },
  {
    id: '3',
    description: 'Carwash',
    amount: 14,
    note: 'Washed my car today!',
    createdAt: moment(0).add(4, 'days').valueOf()
  }
];
