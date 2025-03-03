// src/api/ApiPayments.ts

import axios from 'axios';
import { cookieUtils } from '@/utiles/cookieUtils';

export const purchaseConfirm = async (
  paymentKey: string,
  orderId: string,
  amount: number,
): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    return await axios.post(
      '/payments/confirm',
      {
        payment_key: paymentKey,
        order_id: orderId,
        amount: String(amount),
        payment_type: 'NORMAL',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error during the API request', error);
    throw error;
  }
};
export const orderList = async (): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    return await axios.get('/payments/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error during the API request', error);
    throw error;
  }
};

export const getDownload = async (): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    return await axios.get('/download/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error during the API request', error);
    throw error;
  }
};

export const getReportList = async (): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    return await axios.get('/report/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error during the API request', error);
    throw error;
  }
};

export const CreateReport = async (
  problem: number,
  payment: number,
  title: string,
  description: string,
  question_type: 'Incorrect Answer' | 'Defective' | 'Suggestion',
): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    return await axios.post(
      '/report/create',
      {
        problem: String(problem),
        payment: String(payment),
        title,
        description,
        question_type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error during the API request', error);
    throw error;
  }
};

export const CheckPayment = async (problem_id: number): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    return await axios.post(
      '/payment/verify',
      {
        problem_id: String(problem_id),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error during the API request', error);
    throw error;
  }
};
