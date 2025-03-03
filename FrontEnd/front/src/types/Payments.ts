// src/types/Payments.ts
export interface Payment {
  id: number;
  date: string;
  title: string;
  totalAmount: number;
  orderId: string;
  isReport: boolean;
  problemId: number;
  problemFileUrl?: string | null; // 타입 수정: string | null | undefined
  customer_name?: string; // 선택적 속성
}
