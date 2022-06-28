import React from 'react';
import PropTypes from 'prop-types';

class Tabela extends React.Component {
    state = {
      moedas: '',
      cambio: 0,
      tipo: 'Real',
    }

    componentDidMount() {
      this.handleValor();
    }

handleValor = () => {
  const { info } = this.props;
  const { currency, exchangeRates } = info;
  const trocar = parseFloat(exchangeRates[currency].ask);
  // const ajeitarTrocar = trocar;
  const moeda = exchangeRates[currency].name;
  this.setState({
    moedas: moeda,
    cambio: trocar,
  });
}

render() {
  const { info } = this.props;
  const { description, tag, method, value } = info;
  const { moedas, cambio, tipo } = this.state;
  return (
    <tr>
      <td>{ description }</td>
      <td>{ tag }</td>
      <td>{ method }</td>
      <td>{ Number(value).toFixed(2) }</td>
      <td>{ moedas }</td>
      <td>{ Number(cambio).toFixed(2) }</td>
      <td>{ (Number(value) * Number(cambio)).toFixed(2) }</td>
      <td>{ tipo }</td>
      <td>
        <button type="button">Editar</button>
        <button type="button">Excluir</button>
      </td>
    </tr>
  );
}
}

Tabela.propTypes = {
  info: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  exchangeRates: PropTypes.string.isRequired,
};

export default Tabela;
