import React from 'react';
import CartItem from './CartItem'; // Certifique-se de importar o componente CartItem corretamente

function LeftCard() {
  return (
    <div className="leftCard">
      <div className="logo">
        <img className="logo-image" src="./img/logo.png" alt="logo" />
      </div>
      <div className="order">
        <h2 className="order-title">Order Summary</h2>
        <div className="order-items">
          <CartItem
            name="Camiseta PP on Heart"
            quantity="1"
            size="M"
            total="$20.00"
            image="./img/product-1.png"
          />
          <CartItem
            name="Camiseta Paypal Logo"
            quantity="1"
            size="P"
            total="$10.00"
            image="./img/product-2.png"
          />
        </div>
      </div>
      <div className="total">
        <h2 className="total-title">Total bill</h2>
        <h2 className="total-price" id="total-price">$30.00</h2>
      </div>
    </div>
  );
}

export default LeftCard;
