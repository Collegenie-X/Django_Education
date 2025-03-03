// hooks/useStoreProblems.ts
import { useQuery } from '@tanstack/react-query';
import { getRecommandList } from '@/api/ApiStore';
import { StoreProps } from '@/types/store';

const useStoreProblems = (searchQuery: string) => {
  return useQuery<StoreProps[], Error>({
    queryKey: ['storeProblems', searchQuery],
    queryFn: async () => {
      const data = await getRecommandList(searchQuery);
      return data;
    },
    enabled: searchQuery.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    retry: 2, //2번 재시도
  });
};

export default useStoreProblems;
