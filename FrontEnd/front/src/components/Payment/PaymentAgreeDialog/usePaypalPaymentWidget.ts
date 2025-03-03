'use client';

import React, { useRef, useState, useCallback } from 'react';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { v4 as uuidv4 } from 'uuid';

const usePaypalPaymentWidget = (
  price: number,
  customerKey: string,
  orderId: string,
  userName: string,
  userEmail: string,
  orderName: string,
  successUrl: string,
  failUrl: string,
) => {
  const paymentWidgetRef = useRef<null | any>(null);
  const [isUIRendered, setIsUIRendered] = useState(false);

  const renderWidget = useCallback(
    async (retryCount = 0) => {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string;

      if (!clientKey) {
        console.error('NEXT_PUBLIC_TOSS_CLIENT_KEY is not defined.');
        return;
      }

      if (!customerKey || customerKey.length < 2 || customerKey.length > 50) {
        console.error(
          'CustomerKey is invalid. It must be between 2 and 50 characters.',
        );
        return;
      }

      try {
        const widget = await loadPaymentWidget(clientKey, customerKey);
        paymentWidgetRef.current = widget;
        widget.renderPaymentMethods(
          '#payment-method',
          {
            value: price,
            currency: 'USD',
            country: 'US',
          },
          {
            variantKey: 'paypal',
          },
        );
        setIsUIRendered(true);
      } catch (error: any) {
        if (error.message.includes('TOO_MANY_REQUESTS') && retryCount < 3) {
          console.warn('Retrying to initialize Payment Widget...');
          setTimeout(() => renderWidget((retryCount = retryCount + 1)), 3000); // 3초 후에 재시도
        } else {
          console.error('Error initializing Payment Widget:', error);
        }
      }
    },
    [customerKey, price],
  );
  const requestPayment = () => {
    if (!isUIRendered) {
      alert(
        'The payment UI has not been rendered yet. Please try again in a moment.',
      );
      return;
    }

    try {
      paymentWidgetRef.current
        ?.requestPayment({
          method: 'FOREIGN_EASY_PAY',
          amount: {
            currency: 'USD',
            value: price, // price 변수 사용
          },
          orderId, // 외부에서 전달받은 orderId 사용
          orderName, // 외부에서 전달받은 orderName 사용
          successUrl, // 외부에서 전달받은 successUrl 사용
          failUrl, // 외부에서 전달받은 failUrl 사용
          customerEmail: userEmail, // 외부에서 전달받은 userEmail 사용
          customerName: userName, // 외부에서 전달받은 userName 사용
          foreignEasyPay: {
            provider: 'PAYPAL',
            country: 'KR', // 한국에서 결제 진행
          },
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
    renderWidget,
  };
};

export default usePaypalPaymentWidget;
