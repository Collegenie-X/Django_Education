// api/ApiDownloads.ts

import axios from 'axios';
import { cookieUtils } from '@/utiles/cookieUtils';
import {
  DownloadsListResponse,
  DeleteDownloadResponse,
  Download,
} from '@/types/Downloads'; // Adjust the path as necessary

// Get Downloads List API
export const getDownloadsListAPI = async (): Promise<DownloadsListResponse> => {
  try {
    const token = cookieUtils.getCookie('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.get<DownloadsListResponse>(`/downloads`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to get downloads list: ', error);
    throw error;
  }
};

export const createDownloadAPI = async (
  problem: string,
): Promise<DownloadsListResponse> => {
  try {
    const token = cookieUtils.getCookie('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.post<DownloadsListResponse>(
      `/downloads`,
      { problem },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Failed to create download: ', error);
    throw error;
  }
};

// Delete Download API
export const deleteDownloadAPI = async (
  download_id: string,
): Promise<DeleteDownloadResponse> => {
  try {
    const token = cookieUtils.getCookie('token');
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.delete<DeleteDownloadResponse>(
      `/download/${download_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Failed to delete download: ', error);
    throw error;
  }
};
