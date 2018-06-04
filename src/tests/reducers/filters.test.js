import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('Should setup default filters value', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should setupd sortByAmount filter value', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    sortBy: 'amount'
  };
  const action = {type: 'SORT_BY_DATE'};
  const state = filtersReducer(currentState, action);
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('Should set text filter text', () => {
  const text = 'test';
  const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text});
  expect(state.text).toBe('test');
});

test('Should set startDate filter', () => {
  const startDate = moment(2000).startOf('month');
  const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate});
  expect(state.startDate).toEqual(moment(2000).startOf('month'));
});

test('Should set endDate filter', () => {
  const endDate = moment(-2000).startOf('month');
  const state = filtersReducer(undefined, {type: 'SET_END_DATE', endDate});
  expect(state.endDate).toEqual(moment(-2000).startOf('month'));
});
