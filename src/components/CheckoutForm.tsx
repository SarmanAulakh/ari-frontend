import React, { FormEvent, useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { Button } from '@ari/ui-components';
import { useWeb3Auth } from 'src/services/auth';
import apiClient from 'src/util/apiClient';

interface Props {
  walletAddress: string;
  gameId: string;
}

export default function CheckoutForm({ walletAddress, gameId }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { userDetails } = useWeb3Auth();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        setMessage('Something went wrong.');
        return;
      }

      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    // Check for the availability of contracts here
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/confirm_payment`,
        receipt_email: userDetails?.email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message as string);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        type="submit"
        colorType="gradient"
        sx={{
          fontWeight: 'bold',
          color: 'white',
          fontSize: '16px',
        }}
      >
        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}</span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
