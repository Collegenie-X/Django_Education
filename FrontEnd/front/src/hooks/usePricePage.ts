import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { cookieUtils } from '@/utiles/cookieUtils';
import { purchaseConfirm } from '@/api/ApiPayments';

export const usePricePage = () => {
  const [paymentCompleteDialogOpen, setPaymentCompleteDialogOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(1);
  const searchParams = useSearchParams(); // searchParams 훅을 사용하여 쿼리 파라미터를 가져옴

  useEffect(() => {
    const paymentKey = searchParams?.get('paymentKey') || ''; // 기본 값으로 빈 문자열 설정
    const orderId = searchParams?.get('orderId') || ''; // 기본 값으로 빈 문자열 설정
    const amount = Number(searchParams?.get('amount') || 1); // 기본 값으로 1 설정

    if (paymentKey && orderId && amount) {
      const token = cookieUtils.getCookie('token');

      if (!token) {
        alert('Token not found. Please login.');
        return;
      }

      setAmount(amount);

      const confirmPayment = async () => {
        setIsLoading(true);
        try {
          const response = await purchaseConfirm(paymentKey, orderId, amount);

          if (response.status === 200) {
            setPaymentCompleteDialogOpen(true);
          }
        } catch (error: any) {
          if (error?.response?.status === 401) {
            alert('Unauthorized: Please login.');
            return;
          }
          console.error('Payment confirmation failed:', error.message);
          alert('Payment confirmation failed');
        } finally {
          setIsLoading(false);
        }
      };

      confirmPayment();
    }
  }, [searchParams]); // searchParams가 변경될 때마다 useEffect 실행

  return {
    paymentCompleteDialogOpen,
    isLoading,
    amount,
    setPaymentCompleteDialogOpen,
  };
};
