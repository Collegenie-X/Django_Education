// src/hooks/useFreeList.ts
import { useQuery } from '@tanstack/react-query';
import { getFreeList } from '@/api/ApiStore';

const useFreeList = (page: number) => {
  return useQuery({
    queryKey: ['storeFreeNewList', page],
    queryFn: () => getFreeList(page, 30),
    staleTime: 1000 * 60 * 2, // 데이터 신선도 유지 시간 (2분)
    retry: 2, // 실패 시 재시도 횟수
  });
};

export default useFreeList;
