import { getNotice } from '@/api/ApiInfoService';
import { useQuery } from '@tanstack/react-query';

interface NoticeItemProps {
  id: number;
  title: string;
  description: string;
}

export const useFetchNotices = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<NoticeItemProps[]>({
    queryKey: ['Notices'],
    queryFn: async () => {
      const response = await getNotice();
      console.log('Fetching store list:', response.data);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 새로워짐
  });

  return { data, isLoading, error };
};
