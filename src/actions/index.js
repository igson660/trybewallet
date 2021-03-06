import { SET_USER, SET_CURRENCIES, SET_EXPENSES } from './actionsType';
import getApi from '../service/getApi';

export const userAction = (payload) => ({
  type: SET_USER,
  payload,
});

export const currenciesAction = (payload) => ({
  type: SET_CURRENCIES,
  payload,
});

export const expensesAction = (payload) => ({
  type: SET_EXPENSES,
  payload,
});

export const getApiThunk = () => (dispatch) => {
  getApi().then((res) => {
    if (res.USDT) {
      delete res.USDT;
    }
    dispatch(currenciesAction(Object.keys(res)));
  });
};

export const expensesActionThunk = (state) => (dispatch) => {
  getApi()
    .then((response) => {
      const expenses = {
        ...state,
        exchangeRates: response,
      };
      dispatch(expensesAction(expenses));
    });
};
