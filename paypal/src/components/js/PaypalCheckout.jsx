import { useEffect } from 'react';
import PropTypes from 'prop-types';
import paypal from 'paypal-checkout';

const PaypalCheckout = ({ cartItems }) => {
  useEffect(() => {
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    if (paypalButtonContainer) {
      const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

      paypal.Button.render({
        env: 'sandbox', // ou 'production' para ambiente de produção
        client: {
          sandbox: 'YOUR_SANDBOX_CLIENT_ID', // Substitua pelo seu ID de cliente sandbox
          // production: 'YOUR_PRODUCTION_CLIENT_ID',
        },
        commit: true,
        payment: function (data, actions) {
          return actions.payment.create({
            transactions: [{
              amount: {
                total: total.toFixed(2),
                currency: 'USD'
              }
            }]
          });
        },
        onAuthorize: function (data, actions) {
          return actions.payment.execute().then(function () {
            console.log('Payment successful!', data);
            // Aqui você pode adicionar lógica adicional, como atualizar o estado de pagamento bem-sucedido no seu aplicativo
          });
        },
        onCancel: function (data) {
          console.log('Payment canceled.', data);
          // Você pode adicionar lógica aqui para lidar com o cancelamento de pagamento, se necessário
        }
      }, '#paypal-button-container');
    }
  }, [cartItems]);

  return (
    <div id="paypal-button-container"></div>
  );
};

PaypalCheckout.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PaypalCheckout;
