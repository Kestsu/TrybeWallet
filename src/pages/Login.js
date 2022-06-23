import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailAcao } from '../actions/index';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabledButton: true,
  }

  handleChange = ({ target }) => {
    const { value, type } = target;
    this.setState({
      [type]: value,
    }, () => this.button());
  }

  button = () => {
    const { email, password } = this.state;
    const cinco = 5;
    if (password.length > cinco && email.includes('@') && email.includes('.com')) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  handleSubmit = () => {
    const { changeGlobal, history } = this.props;
    const { email } = this.state;
    changeGlobal(email);
    history.push('/carteira');
  }

  render() {
    const { disabledButton } = this.state;
    return (
      <div>
        <label htmlFor="login">
          Email
          <input
            data-testid="email-input"
            type="email"
            id="login"
            placeholder="Digite seu Email"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input"
            type="password"
            id="password"
            placeholder="Digite sua senha"
            minLength="6"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ disabledButton }
          onClick={ this.handleSubmit }
        >
          Entrar

        </button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  changeGlobal: (state) => dispatch(emailAcao(state)),
});

Login.propTypes = {
  changeGlobal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
