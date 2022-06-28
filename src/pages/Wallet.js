import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moneyType, expensesType } from '../actions/index';
import TypeCoin from '../componentes/TypeCoin';
import Tabela from '../componentes/Tabela';

class Wallet extends React.Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    total: 0,
    despesas: [],
    button: true,
  }

  componentDidMount() {
    const { moedas } = this.props;
    moedas();
  }

handleSaveGlobal = async () => {
  const {
    id,
    value,
    description,
    currency,
    method,
    tag,
  } = this.state;
  const { mapDispatch } = this.props;
  const send = {
    id, value, description, currency, method, tag,
  };
  await mapDispatch(send);
  const numberId = id;
  const atualizar = numberId + 1;
  this.setState({
    id: atualizar,
    value: 0,
    description: '',
  });
  this.handleTotal();
}

handleTotal = () => {
  const { expenses } = this.props;
  const valores = expenses.map((item) => (
    parseFloat(item.exchangeRates[item.currency].ask) * item.value
  ));
  this.setState({
    despesas: valores,
  }, () => this.handleSoma());
}

handleSoma = () => {
  const { despesas } = this.state;
  const reducer = (accumulator, curr) => accumulator + curr;
  const resultado = despesas.reduce(reducer);
  this.setState({
    total: resultado.toFixed(2),
  });
}

handleChange = ({ target }) => {
  const { value, name } = target;
  this.setState({
    [name]: value,
  }, () => this.handleButton());
}

handleButton = () => {
  const { description, value } = this.state;
  console.log(description.length);
  console.log(parseFloat(value));
  if (description.length !== 0 && value !== '0') {
    this.setState({
      button: false,
    });
  } this.setState({
    button: true,
  });
}

render() {
  const { total, value, description, method, tag, button } = this.state;
  const { currencies, email, expenses } = this.props;
  return (
    <div>
      <h1>TrybeWallet</h1>
      <h2 data-testid="email-field">{email}</h2>
      <h4>Total:</h4>
      <h4 data-testid="total-field">
        {total}
      </h4>
      <h4 data-testid="header-currency-field">BRL</h4>
      <label htmlFor="Moeda">
        Moeda:
        <select
          name="currency"
          id="Moeda"
          onChange={ this.handleChange }
        >
          {
            currencies.map((item) => (
              <TypeCoin valor={ item } key={ item } />
            ))
          }
        </select>
      </label>
      <br />
      <label htmlFor="despesa">
        Motivo:
        <input
          name="description"
          type="text"
          value={ description }
          data-testid="description-input"
          placeholder="Computador"
          onChange={ this.handleChange }
        />
      </label>
      <br />
      <label htmlFor="valor">
        {' '}
        Valor:
        <input
          name="value"
          type="text"
          value={ value }
          data-testid="value-input"
          placeholder="Valor da despesas"
          onChange={ this.handleChange }
        />
      </label>
      <br />
      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          id="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <br />
      <label htmlFor="categoria">
        Categoria:
        <select
          name="tag"
          id="categoria"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <br />
      <button
        type="button"
        disabled={ button }
        onClick={ this.handleSaveGlobal }
      >
        Adicionar despesa

      </button>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((item) => (
              <Tabela
                key={ item.id }
                info={ item }
              />
            ))
          }

        </tbody>
      </table>
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  moedas: () => dispatch(moneyType()),
  mapDispatch: (state) => dispatch(expensesType(state)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  moedas: PropTypes.func.isRequired,
  currencies: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
  mapDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
