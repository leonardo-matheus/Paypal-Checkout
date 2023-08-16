import React, { useState, useEffect } from 'react';
import paypal from 'paypal-checkout';

function PaymentForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {
    integrateWithPayPal();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
    };

    try {
      const response = await fetch('/api/submitOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { orderId } = await response.json();
        alert(`Pedido enviado com sucesso! ID: ${orderId}`);
      } else {
        console.error('Erro ao enviar pedido para a API');
      }
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
    }
  };

  const integrateWithPayPal = () => {
    paypal.Button.render({
      env: 'sandbox', 
      client: {
        sandbox: 'AVMI7am8CUTe3qaN4lI7c_-GiHxqAYoWClH142plQJ9VjU-NXT8vfsW9DT88A88gdEGltqLXm4PQ5_-z', 
      },
      commit: true, // Exibir o botão "Pay Now" no popup
      style: {
        color: 'gold', // Cor do botão
        size: 'medium', // Tamanho do botão
      },
      createOrder: function(data, actions) {
        // Crie uma ordem para pagamento com o PayPal
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '30.00', // Substitua pelo valor do pedido
            },
          }],
        });
      },
      onAuthorize: function(data, actions) {
        // Ação executada quando o pagamento é autorizado
        return actions.order.capture().then(function(details) {
          console.log('Pagamento autorizado:', details);
          // Você pode redirecionar ou exibir uma mensagem de sucesso aqui
        });
      },
      onCancel: function(data) {
        console.log('Pagamento cancelado:', data);
        // Você pode exibir uma mensagem de cancelamento aqui
      },
    }, '#paypal-button-container');
  };
  

  return (
    <div className="form-block">
      <h3 className="titleForm">Complete seu pedido</h3>
      <form className="form" onSubmit={handleFormSubmit}>
        <h4>Personal Details</h4>
        <div className="form-name">
          <div className="form-name-item">
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-name-item">
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="login-info">
          <div className="form-name-item">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-name-item">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <h4>Shipping Address</h4>
        <div className="form-name">
          <div className="form-name-item">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-name-item">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="form-name">
          <div className="form-name-item">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              className="form-control"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="form-name-item">
            <label htmlFor="postal-code">Postal Code:</label>
            <input
              type="text"
              className="form-control"
              id="postal-code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar Pedido
        </button>
      </form>
      <div className="payment-button">
        <div id="paypal-button-container"></div>
      </div>
    </div>
  );
}

export default PaymentForm;
