import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
//ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
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
// REMOVE_EXPENSE
const removeExpense = ( id ) => ({
  type: 'REMOVE_EXPENSE',
  id
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});
// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});
// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});
// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});


//Reducers
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  enDate: undefined
};

const expenseReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter((item)=>{
        return item.id !== action.id;
      });
    case 'EDIT_EXPENSE':
        return state.map((item)=>{
          if (action.id === item.id){
            return {
              ...item,
              ...action.updates
            };
          }
        });
    default:
      return state;
  }
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

//Get visible expenses and sort by date or amount
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((item) => {
    const startDateMatch = typeof startDate !== 'number' || item.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || item.createdAt <= endDate;
    const textMatch = item.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort( (a,b) => {
    if(sortBy === 'date'){
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

// Store creation
const store = createStore(combineReducers({
  expenses: expenseReducer,
  filters: filtersReducer
}));

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
})

const expenseTwo = store.dispatch(addExpense({description: 'Coffee',
amount: 300, createdAt: -1000}));
const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: 1000}));
const expenseThree = store.dispatch(addExpense({description: 'Car',
amount: 400, createdAt: -2000}));


// store.dispatch(removeExpense(expenseOne.expense.id));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));
store.dispatch(sortByAmount());

// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(-1001));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(1001));





// const demoState = {
//   expenses:[{
//     id: 'whatever',
//     description: 'January Rent',
//     note: 'This was the final payment on this adress',
//     amount: 54500,
//     createdAt: 0
//   }],
//   filters: {
//     text: 'rent',
//     sortBy: 'amount', //or endDate
//     startDate: undefined,
//     endDate: undefined
//   }
// };
