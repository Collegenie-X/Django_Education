// src/services/storeService.ts
import axios from 'axios';

export const getStoreDetail = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`/store/list/${id}`);
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
