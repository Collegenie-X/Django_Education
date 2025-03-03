import axios from 'axios';

import { cookieUtils } from '@/utiles/cookieUtils';

export const getStoreList = async (): Promise<any> => {
  try {
    const response = await axios.get('/store/list');

    // Check if the response is 200 OK
    if (response.status === 200) {
      return response.data.results;
    } else {
      throw new Error(`Failed to get store list: ${response.status}`);
    }
  } catch (error: any) {
    console.error('Failed to get store list: ', error);
    throw error;
  }
};

export const getFreeList = async (
  page: number,
  page_size: number,
): Promise<any> => {
  try {
    const response = await axios.get('/store/list', {
      params: { is_free: true, page, page_size },
    });
    // Check if the response is 200 OK
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to get store list: ${response.status}`);
    }
  } catch (error: any) {
    console.error('Failed to get store list: ', error);
    throw error;
  }
};

export const getRecommandList = async (searchQuery: string): Promise<any> => {
  try {
    const response = await axios.get('/store/list', {
      params: { search: searchQuery, page_size: 6 },
    });
    // Check if the response is 200 OK
    if (response.status === 200) {
      return response.data.results;
    } else {
      throw new Error(`Failed to get store list: ${response.status}`);
    }
  } catch (error: any) {
    console.error('Failed to get store list: ', error);
    throw error;
  }
};

export const getStoreDetail = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`/store/list/${id}`);
    return response;
  } catch (error: any) {
    console.error('Failed to get store list: ', error);
    throw error;
  }
};
