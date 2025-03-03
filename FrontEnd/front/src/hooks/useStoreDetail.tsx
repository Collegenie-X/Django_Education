// src/hooks/useStoreDetail.ts
import { useQuery } from '@tanstack/react-query';
import { getStoreDetail } from '@/services/storeService';

const useStoreDetail = (id: string) => {
  return useQuery({
    queryKey: ['storeDetail', id],
    queryFn: () => getStoreDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 1, // 데이터 신선도 유지 시간 (5분)
    retry: 2, // 실패 시 재시도 횟수
  });
};

export default useStoreDetail;
