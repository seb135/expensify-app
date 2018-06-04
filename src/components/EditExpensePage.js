import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component{
  onSubmit = (expenseObject) => {
    this.props.editExpense(this.props.expense.id, expenseObject);
    this.props.history.push('/');
  };

  onClick = () => {
    this.props.removeExpense( {id: this.props.expense.id});
    this.props.history.push('/');
  };

  render(){
    return(
      <div>
        <ExpenseForm
          expense={this.props.expense} //Available thorugh connect
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onClick}>Remove</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expenseObject) => dispatch(editExpense(id,expenseObject)),
  removeExpense: ({id}) => dispatch(removeExpense({id}))
});

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((item)=>{
      return item.id === props.match.params.id;
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
