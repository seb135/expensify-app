import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
//ADD expenses

const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
  }={}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});
//Remove expense
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});
//Edit expense
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

//set text filter
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});
//soty by amount
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});
// sort by date
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});
// set start date
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});
// set endDate
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});
// expensesReducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return[
        ...state,
        action.expense
      ];
      case 'REMOVE_EXPENSE':
        return state.filter((item)=>{
          return item.id !== action.id;
        });
      case 'EDIT_EXPENSE':
        return state.map((expense) => {
          if(expense.id === action.id){
            return {
              ...expense,
              ...action.updates
            }
          } else {
            return expense;
          }
        });
    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'amount', //or date
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
    return{
      ...state,
      text: action.text
    }
    case 'SORT_BY_DATE':
    return{
      ...state,
      sortBy: 'date'
    }
    case 'SORT_BY_AMOUNT':
    return{
      ...state,
      sortBy: 'amount'
    }
    case 'SET_START_DATE':
      return{
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return{
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
};

//Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

// const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100 }));
// const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));
//
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}));
//
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
//
// store.dispatch(sortByDate());
// store.dispatch(sortByAmount());

store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
store.dispatch(setEndDate(1250));




const demoState = {
  expenses: [{
    id: 'whatever',
    descpription: 'January Rent',
    note: 'This is a note',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //or date
    startDate: undefined,
    endDate: undefined
  }
};

const user = {
  name: 'Sebas',
  age: 32
};
