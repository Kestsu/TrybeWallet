// Esse reducer será responsável por tratar as informações da pessoa usuária
import { emailAction } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
//   console.log(action);
  switch (action.type) {
  case emailAction:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
