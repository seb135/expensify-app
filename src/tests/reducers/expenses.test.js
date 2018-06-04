import expenseReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should return default state', () => {
  const state = expenseReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('Should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([expenses[0],expenses[2]]);
});

test('Should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('Should add expense to existing state', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      id: '101',
      description: 'Car',
      amount: 200
    }
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([...expenses,action.expense]);
});

test('Should edit expense with same id', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '2',
    updates: {
      amount: 5.00,
      description: 'This coffee tastes like crap'
    }
  };
  const state = expenseReducer(expenses, action);
  expect(state[1].description).toBe('This coffee tastes like crap');
  expect(state[1].amount).toBe(5.00);
});

test('Should not edit expense if no id match', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      amount: 100000000,
      description: 'Poo'
    }
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual(expenses);
});
