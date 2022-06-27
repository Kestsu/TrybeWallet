// Coloque aqui suas actions
import API from '../services/API';

export const emailAction = 'emailAction';
export const walletAction = 'walletAction';
export const expensesAction = 'expensesAction';

export const emailAcao = (payload) => ({
  type: emailAction,
  payload,
});

export const walletAcao = (payload) => ({
  type: walletAction,
  payload,
});

export const moneyType = () => async (dispatch) => {
  const array = await API();
  const objeto = Object.keys(array);
  const obj = objeto.filter((item) => item !== 'USDT');
  dispatch(walletAcao((obj)));
};

export const expensesAcao = (payload) => ({
  type: expensesAction,
  payload,
});

export const expensesType = (state) => async (dispatch) => {
  const array = await API();
  const objeto = {
    ...state,
    exchangeRates: array,
  };
  dispatch(expensesAcao((objeto)));
};
