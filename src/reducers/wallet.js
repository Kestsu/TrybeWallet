// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { walletAction, expensesAction } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
//   console.log(action);
  switch (action.type) {
  case walletAction:
    return {
      ...state,
      currencies: action.payload,
    };
  case expensesAction:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
