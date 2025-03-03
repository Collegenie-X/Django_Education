'use client';

import React, { useRef, useState, useCallback } from 'react';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';

const useCardPaymentWidget = (
  price: number,
  customerKey: string,
  orderId: string,
  orderName: string,
  userName: string,
  userEmail: string,
  successUrl: string,
  failUrl: string,
) => {
  const paymentWidgetRef = useRef<null | any>(null);
  const paymentMethodsWidgetRef = useRef<null | any>(null);
  const [isUIRendered, setIsUIRendered] = useState(false);

  const renderWidget = useCallback(async () => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string;

    try {
      const loadedWidget = await loadPaymentWidget(clientKey, customerKey);
      paymentWidgetRef.current = loadedWidget;

      if (
        document.querySelector('#payment-method') &&
        document.querySelector('#agreement')
      ) {
        const paymentMethodsWidget = loadedWidget.renderPaymentMethods(
          '#payment-method',
          { value: price, currency: 'KRW', country: 'KR' },
          { variantKey: 'storeWidget' },
        );

        loadedWidget.renderAgreement('#agreement', {
          variantKey: 'AGREEMENT',
        });

        paymentMethodsWidgetRef.current = paymentMethodsWidget;

        setIsUIRendered(true);
      } else {
        console.error(
          'Required DOM elements not found for rendering payment methods and agreement.',
        );
      }
    } catch (error) {
      console.error('Error fetching payment widget:', error);
    }
  }, [customerKey, price]);

  const requestPayment = async () => {
    if (!isUIRendered) {
      alert(
        'The payment UI has not been rendered yet. Please try again in a moment.',
      );
      return;
    }

    try {
      await paymentWidgetRef.current
        ?.requestPayment({
          orderId,
          orderName,
          customerName: userName,
          customerEmail: userEmail,
          successUrl, // Success redirect URL
          failUrl, // Failure redirect URL
        })
        .catch((error: any) => {
          if (error.code === 'INVALID_ORDER_NAME') {
            alert('Invalid order name.');
          } else if (error.code === 'INVALID_ORDER_ID') {
            alert('Invalid order ID.');
          } else {
            console.error('Error during payment processing:', error);
          }
        });
    } catch (error) {
      console.error('Error during payment processing:', error);
    }
  };

  return {
    requestPayment,
    renderWidget, // Add renderWidget to the return object
  };
};

export default useCardPaymentWidget;
