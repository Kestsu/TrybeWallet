import React from 'react';
import PropTypes from 'prop-types';

class TypeCoin extends React.Component {
  render() {
    const { valor, key } = this.props;
    return (
      <option key={ key } value={ valor }>{ valor }</option>
    );
  }
}

TypeCoin.propTypes = {
  valor: PropTypes.string,
  key: PropTypes.string,
};

TypeCoin.defaultProps = {
  valor: null,
  key: null,
};

export default TypeCoin;
