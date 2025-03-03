// src/hooks/useStoreTypes.ts
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';

// API 호출 함수 정의
const getUnitTypes = async () => {
  const response = await axios.get('/store/unit-types');
  return response.data;
};

const getSectionTypes = async () => {
  const response = await axios.get('/store/section-types');
  return response.data;
};

// 커스텀 훅 정의
const useStoreTypes = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['unitTypes'],
        queryFn: getUnitTypes,
        staleTime: 1000 * 60 * 5, // 2분
        retry: 2,
      },
      {
        queryKey: ['sectionTypes'],
        queryFn: getSectionTypes,
        staleTime: 1000 * 60 * 5, // 2분
        retry: 2,
      },
    ],
  });

  // 결과 구조 분해
  const unitTypesResult = results[0];
  const sectionTypesResult = results[1];

  return {
    unitTypes: unitTypesResult.data,
    unitTypesLoading: unitTypesResult.isLoading,
    unitTypesError: unitTypesResult.error,

    sectionTypes: sectionTypesResult.data,
    sectionTypesLoading: sectionTypesResult.isLoading,
    sectionTypesError: sectionTypesResult.error,
  };
};

export default useStoreTypes;
