import React from 'react';
import PropTypes from 'prop-types';

function CartItem({ name, quantity, size, total, image }) {
  return (
    <div className="order-item">
      <div className="order-item-image">
        <img src={image} alt="product" />
      </div>
      <div className="order-item-info">
        <h5>{name}</h5>
        <h6>Quantity: {quantity}</h6>
        <h6>Size: {size}</h6>
        <h6>Total: {total}</h6>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CartItem;
