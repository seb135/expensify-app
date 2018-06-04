import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import uuid from 'uuid';

test('Test for removeExpense action Object', () => {
  const action = removeExpense({id: '123ABC'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123ABC'
  })
});

test('Test for setup addExpense action Object', () => {
  const action = editExpense('123ABC', {
  description : 'Description',
  note : 'Note',
  amount : 100,
  createdAt : 100});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123ABC',
    updates: {
      description : 'Description',
      note : 'Note',
      amount : 100,
      createdAt : 100
    }
  })
});

test('Should set up addExpense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'this was last months rent'
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });
});

test('Should setup addExpense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });
});
