// hooks/usePayments.ts
import { useQuery } from '@tanstack/react-query';
import { orderList } from '@/api/ApiPayments';

interface Payment {
  id: number;
  date: string;
  title: string;
  totalAmount: number;
  orderId: string;
  receipt: string;
  isPaid: boolean;
  paymentMethod: string;
  isReport: boolean;
  problemId: number;
  problemFileUrl: string | null;
}

const fetchPayments = async (): Promise<Payment[]> => {
  const response = await orderList();

  // response.data.payment_list가 배열인지 확인
  if (!response.data || !Array.isArray(response.data.payment_list)) {
    throw new Error('Invalid payment list data');
  }

  return response.data.payment_list.map((payment: any) => ({
    id: payment.id,
    date: payment.requested_at,
    title: payment.order_name,
    totalAmount: parseFloat(payment.amount),
    orderId: payment.order_id,
    receipt: 'Receipt', // 실제 영수증 데이터로 대체
    isPaid: payment.is_paid,
    isReport: payment.is_report || false,
    paymentMethod: payment.method,
    problemId: payment.problem_id,
    problemFileUrl: payment.problem_file_url,
  }));
};

const usePayments = () => {
  const { data, isLoading, isError, error } = useQuery<Payment[], Error>({
    queryKey: ['payments'],
    queryFn: fetchPayments,
    staleTime: 60 * 1000 * 5, // 5분
    retry: 2, // 실패 시 2번 재시도
  });

  return {
    paymentsData: data || [], // data가 undefined일 경우 빈 배열 반환
    loading: isLoading,
    error: isError ? error.message : null, // 에러 메시지 반환
  };
};

export default usePayments;
