import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStoreList } from '@/api/ApiStore';
import { StoreProps } from '@/types/store';

interface StoreSectionConfig {
  title: string;
  sliceCount?: number; // 선택적: 아이템 개수를 제한
  filter: (item: StoreProps) => boolean; // 필터링 기준
}

// 반환될 섹션 인터페이스 정의
interface StoreSection {
  title: string;
  items: StoreProps[];
}

export const useStoreList = (
  selectedCategory: string,
  selectedSubCategory: string,
  searchQuery: string,
  storeSections: StoreSectionConfig[], // storeSections를 매개변수로 받음
) => {
  const queryClient = useQueryClient();

  const {
    data: storeList = [],
    isLoading,
    error,
  } = useQuery<StoreProps[]>({
    queryKey: ['storeList', selectedCategory, selectedSubCategory, searchQuery],
    queryFn: async () => {
      const data = await getStoreList();
      console.log('스토어 리스트 가져오기:', data);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선
    enabled: true, // 항상 활성화
  });

  // 카테고리, 서브카테고리, 검색어를 기반으로 일반 필터링
  const filteredItems = storeList
    .filter(
      (item: StoreProps) =>
        (selectedCategory === 'All' || item.subject === selectedCategory) &&
        (selectedSubCategory === 'All' || item.type === selectedSubCategory) &&
        (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a: StoreProps, b: StoreProps) => {
      // created_date 기준 내림차순 정렬
      const dateA = new Date(a.created_date).getTime();
      const dateB = new Date(b.created_date).getTime();

      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;

      // created_date가 동일한 경우 subject와 type으로 추가 정렬
      if (a.subject < b.subject) return -1;
      if (a.subject > b.subject) return 1;

      return 0;
    });

  // 섹션별 필터링 적용
  const sectionsFilteredItems: StoreSection[] = storeSections.map(
    (section) => ({
      title: section.title,
      items: filteredItems.filter(section.filter),
    }),
  );

  return { sectionsFilteredItems, isLoading, error };
};
