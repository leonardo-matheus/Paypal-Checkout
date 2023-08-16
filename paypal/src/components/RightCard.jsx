import { useEffect } from 'react';
import PayPalButton from './js/PaypalCheckout';
import paypal from 'paypal-checkout';

function RightCard() {
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      postalCode: document.getElementById('postal-code').value,
    };

    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Order submitted successfully!');
      } else {
        alert('Error submitting order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('An error occurred while submitting the order.');
    }
  };

  useEffect(() => {
    if (paypal.HostedFields.isEligible()) {
      // PayPal rendering and integration code...
    } else {
      document.querySelector('#card-form').style = 'display: none';
    }
  }, []);

  return (
    <div className="rightCard">
      <div className="form-block">
        <h3 className="titleForm">Complete your order</h3>
        <form className="form" id="card-form" onSubmit={handleFormSubmit}>
          {/* ... your form fields here ... */}
          <button type="submit" className="btn btn-primary">Submit Order</button>
        </form>
        <div className="payment-button">
          <div id="paypal-button-container"></div>
        </div>
        <PayPalButton />
      </div>
    </div>
  );
}

export default RightCard;
