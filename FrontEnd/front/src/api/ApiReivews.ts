import { cookieUtils } from '@/utiles/cookieUtils';
import axios from 'axios';

// 리뷰 목록을 가져오는 API 요청
export const getStoreProblemReview = async (
  problem_id: string,
): Promise<any> => {
  try {
    const response = await axios.get(`/store/reviews/${problem_id}`);
    return response.data;
  } catch (error: any) {
    console.error('Failed to get store review list: ', error);
    throw error;
  }
};

// 리뷰를 생성하는 API 요청
export const createStoreProblemReview = async (
  problem_id: string,
  rating: string,
  comment: string,
): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.post(
      `/store/reviews/${problem_id}`,
      { rating, comment },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Failed to create store review: ', error);
    throw error;
  }
};

// 리뷰를 수정하는 API 요청
export const updateStoreProblemReview = async (
  review_id: string,
  rating: string,
  comment: string,
): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.put(
      `/reviews/${review_id}`,
      { rating, comment },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Failed to update store review: ', error);
    throw error;
  }
};

// 리뷰를 삭제하는 API 요청
export const deleteStoreProblemReview = async (
  review_id: string,
): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.delete(`/reviews/${review_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to delete store review: ', error);
    throw error;
  }
};
