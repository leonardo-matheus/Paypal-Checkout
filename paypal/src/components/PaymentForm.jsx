import React, { useState } from 'react';

function PaymentForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleFormSubmit = (event) => {
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

    // Enviar o objeto formData para o servidor ou API usando fetch ou axios
    fetch('/api/submitOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Lidar com a resposta do servidor/API
        console.log('Resposta do servidor:', data);
        // Exemplo: mostrar uma mensagem de sucesso
        alert('Pedido enviado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao enviar o formulário:', error);
        // Exemplo: mostrar uma mensagem de erro
        alert('Erro ao enviar o pedido. Tente novamente mais tarde.');
      });
  };

  return (
    <div className="form-block">
      <h3 className="titleForm">Complete seu pedido</h3>
      <form className="form" onSubmit={handleFormSubmit}>
        <h4>Detalhes Pessoais</h4>
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

        <h4>Endereço de Entrega</h4>
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
