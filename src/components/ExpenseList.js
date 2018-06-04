import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No Expenses found</p>
      ) : (
        props.expenses.map((item)=>{
          return <ExpenseListItem {...item} key={item.id}/>
        })
      )
    }
  </div>
);

const mapStatetoProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStatetoProps)(ExpenseList);
