import { useEffect } from 'react';
import PropTypes from 'prop-types';
import paypal from 'paypal-checkout';

const PaypalButton = ({ total, onSuccess, onCancel }) => {
  useEffect(() => {
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    if (paypalButtonContainer) {
      paypal.Button.render({
        env: 'sandbox', // ou 'production' para ambiente de produção
        client: {
          sandbox: 'AVMI7am8CUTe3qaN4lI7c_-GiHxqAYoWClH142plQJ9VjU-NXT8vfsW9DT88A88gdEGltqLXm4PQ5_-z', // Substitua pelo seu ID de cliente sandbox
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
            onSuccess(data); // Chame a função de sucesso passada como prop
          });
        },
        onCancel: function (data) {
          console.log('Payment canceled.', data);
          onCancel(data); // Chame a função de cancelamento passada como prop
        }
      }, '#paypal-button-container');
    }
  }, [total, onSuccess, onCancel]);

  return (
    <div id="paypal-button-container"></div>
  );
};

PaypalButton.propTypes = {
  total: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PaypalButton;
