// hooks/usePaymentStatus.ts
import { useState, useEffect } from 'react';
import { CheckPayment } from '@/api/ApiPayments';
import { cookieUtils } from '@/utiles/cookieUtils';

interface PaymentStatus {
  isPayment: boolean;
  fileUrl: string | null;
}

const usePaymentStatus = (problemId: string): PaymentStatus | undefined => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | undefined>(
    undefined,
  );

  const fetchPaymentStatus = async () => {
    try {
      const response = await CheckPayment(Number(problemId));
      const { is_payment, file_url } = response.data;
      setPaymentStatus({
        isPayment: is_payment,
        fileUrl: file_url || null,
      });
      return { is_payment, file_url };
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access - prompting user to log in.');
      } else {
        console.error('Error fetching payment status:', error);
      }
      setPaymentStatus(undefined);
      return undefined;
    }
  };

  useEffect(() => {
    if (cookieUtils.getCookie('token')) {
      fetchPaymentStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId]);

  return paymentStatus;
};

export default usePaymentStatus;
