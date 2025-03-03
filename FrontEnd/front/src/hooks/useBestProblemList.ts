// src/hooks/useStoreList.ts
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { StoreProps } from '@/types/store';

// 각 섹션의 설정을 정의하는 인터페이스
interface StoreSectionConfig {
  title: string;
  sliceCount?: number; // 선택적: 아이템 개수를 제한
  queryParams: Record<string, any>; // API 호출 시 사용할 쿼리 파라미터
}

// 각 섹션별로 반환할 데이터 구조
interface StoreSection {
  title: string;
  items: StoreProps[];
  isLoading: boolean;
  error: Error | null;
}

// 훅의 반환 타입
interface UseStoreListReturn {
  sections: StoreSection[];
}

export const useStoreList = (
  storeSections: StoreSectionConfig[],
): UseStoreListReturn => {
  const getStoreProblems = async (
    queryParams: Record<string, any>,
  ): Promise<{
    results: StoreProps[];
    count: number;
    num_pages: number;
    current_page: number;
    page_size: number;
  }> => {
    const response = await axios.get('/store/list', {
      params: {
        page: 1,
        page_size: 40,
        ...queryParams,
      },
    });
    return response.data;
  };

  const queries: UseQueryResult<any, Error>[] = useQueries({
    queries: storeSections.map((section) => ({
      queryKey: ['storeProblems', section.title, section.queryParams],
      queryFn: () => getStoreProblems(section.queryParams),
      staleTime: 1000 * 60 * 3, // 3분
      retry: 2,
    })),
  });

  // 각 쿼리의 결과를 기반으로 섹션 데이터를 구성
  const sections: StoreSection[] = queries.map((query, index) => ({
    title: storeSections[index].title,
    items: query.data?.results ?? [],
    isLoading: query.isLoading,
    error: query.error ?? null,
  }));

  return { sections };
};
