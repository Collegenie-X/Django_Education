// src/hooks/useDownloads.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { cookieUtils } from '@/utiles/cookieUtils';
import {
  Download,
  DownloadsListResponse,
  DeleteDownloadResponse,
} from '@/types/Downloads'; // 실제 경로에 맞게 조정
import {
  createDownloadAPI,
  deleteDownloadAPI,
  getDownloadsListAPI,
} from '@/api/ApiDownloads';

const useDownloads = () => {
  const queryClient = useQueryClient();

  // Fetch Downloads List
  const {
    data: downloadsData,
    error,
    isLoading,
    isError,
  } = useQuery<DownloadsListResponse, Error>({
    queryKey: ['downloads'],
    queryFn: getDownloadsListAPI,
    retry: 2, // Retry twice on failure
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Create Download Mutation
  const createDownloadMutation = useMutation<
    DownloadsListResponse,
    Error,
    string
  >({
    mutationFn: createDownloadAPI,
    onSuccess: () => {
      // Invalidate and refetch downloads list
      queryClient.invalidateQueries({ queryKey: ['downloads'] });
    },
    onError: (error: Error) => {
      console.error('Failed to create download: ', error);
    },
  });

  // Delete Download Mutation
  const deleteDownloadMutation = useMutation<
    DeleteDownloadResponse,
    Error,
    string
  >({
    mutationFn: deleteDownloadAPI,
    onSuccess: () => {
      // Invalidate and refetch downloads list
      queryClient.invalidateQueries({ queryKey: ['downloads'] });
    },
    onError: (error: Error) => {
      console.error('Failed to delete download: ', error);
    },
  });

  return {
    downloads: downloadsData?.results,
    downloadsMeta: {
      count: downloadsData?.count,
      page: downloadsData?.page,
      page_size: downloadsData?.page_size,
      total_pages: downloadsData?.total_pages,
    },
    error,
    isError,
    isLoading,
    // Mutate functions
    createDownload: createDownloadMutation.mutate,
    deleteDownload: deleteDownloadMutation.mutate,
  };
};

export default useDownloads;
