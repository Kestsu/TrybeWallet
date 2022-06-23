import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  state = {
    usuario: '',
    total: 0,
  }

  componentDidMount() {
    const { email } = this.props;
    this.setState({
      usuario: email,
    });
  }

  render() {
    const { usuario, total } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <h2 data-testid="email-field">{usuario}</h2>
        <h4 data-testid="total-field">
          Despesa Total:
          {' '}
          {total}
        </h4>
        <select data-testid="header-currency-field">
          <option value="BRL">BRL</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
