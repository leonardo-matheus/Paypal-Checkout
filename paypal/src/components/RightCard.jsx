// eslint-disable-next-line no-unused-vars
import React from 'react';
import PayPalButton from './PaypalButton';
import paypal from 'paypal-checkout';

function RightCard() {
  // Function to handle the form submission with PayPal
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // ... your form submission logic ...

    // Call the PayPal integration code
    if (paypal.HostedFields.isEligible()) {
      let orderId;
      // Renders card fields
      paypal.HostedFields.render({
        // Call your server to set up the transaction
        createOrder: () => {
          return fetch('/api/orders', {
            method: 'post',
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
              cart: [
                {
                  sku: 'YOUR_PRODUCT_STOCK_KEEPING_UNIT',
                  quantity: 'YOUR_PRODUCT_QUANTITY',
                },
              ],
            }),
          })
            .then((res) => res.json())
            .then((orderData) => {
              orderId = orderData.id;
              // needed later to complete capture
              return orderData.id;
            });
        },
        styles: {
          '.valid': {
            color: 'green',
          },
          '.invalid': {
            color: 'red',
          },
        },
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '4111 1111 1111 1111',
          },
          cvv: {
            selector: '#cvv',
            placeholder: '123',
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: 'MM/YY',
          },
        },
      }).then((cardFields) => {
        document.querySelector('#card-form').addEventListener('submit', (event) => {
          event.preventDefault();
          cardFields
            .submit({
              // Cardholder's first and last name
              cardholderName: document.getElementById('card-holder-name').value,
              // Billing Address
              billingAddress: {
                // Street address, line 1
                streetAddress: document.getElementById(
                  'card-billing-address-street',
                ).value,
                // Street address, line 2 (Ex: Unit, Apartment, etc.)
                extendedAddress: document.getElementById(
                  'card-billing-address-unit',
                ).value,
                // State
                region: document.getElementById('card-billing-address-state').value,
                // City
                locality: document.getElementById('card-billing-address-city')
                  .value,
                // Postal Code
                postalCode: document.getElementById('card-billing-address-zip')
                  .value,
                // Country Code
                countryCodeAlpha2: document.getElementById(
                  'card-billing-address-country',
                ).value,
              },
            })
            .then(() => {
              fetch(`/api/orders/${orderId}/capture`, {
                method: 'post',
              })
                .then((res) => res.json())
                .then((orderData) => {
                  // Two cases to handle:
                  //   (1) Other non-recoverable errors -> Show a failure message
                  //   (2) Successful transaction -> Show confirmation or thank you
                  // This example reads a v2/checkout/orders capture response, propagated from the server
                  // You could use a different API or structure for your 'orderData'
                  const errorDetail =
                    Array.isArray(orderData.details) && orderData.details[0];
                  if (errorDetail) {
                    var msg = 'Sorry, your transaction could not be processed.';
                    if (errorDetail.description)
                      msg += '\n\n' + errorDetail.description;
                    if (orderData.debug_id)
                      msg += ' (' + orderData.debug_id + ')';
                    return alert(msg); // Show a failure message
                  }
                  // Show a success message or redirect
                  alert('Transaction completed!');
                });
            })
            .catch((err) => {
              alert('Payment could not be captured! ' + JSON.stringify(err));
            });
        });
      });
    } else {
      // Hides card fields if the merchant isn't eligible
      document.querySelector('#card-form').style = 'display: none';
    }
  };

  return (
    <div className="rightCard">
      <div className="form-block">
        <h3 className="titleForm">Complete your order</h3>
        <form className="form" id="card-form" onSubmit={handleFormSubmit}>
          {/* ... your existing form code ... */}
          {/* Add submit button */}
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
