// src/hooks/useProblemList.ts
import { StoreProps } from '@/types/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface PreviewImage {
  id: number;
  image_url: string;
  uploaded_at: string;
}

interface ProblemsResponse {
  parameters: {
    problem_type: string | null;
    subject: string | null;
    grade: string | null;
    search: string | null;
    unit: string | null;
    is_free: boolean | null;
    detailed_section: string | null;
    difficulty: number | null;
    type: string | null;
  };
  count: number;
  num_pages: number;
  current_page: number;
  page_size: number;
  results: StoreProps[];
}

interface FormData {
  subject: string | undefined; // subject 타입을 subjects 배열의 값 중 하나로 제한
  search: string | undefined;
  grade: string | undefined;
  unit: string | undefined;
  detailed_section: string | undefined;
  type: string | undefined;
  recommended: string | undefined;
}

const fetchProblemList = async (filters: FormData, page: number) => {
  // 클라이언트 측에서 recommended이 Yes인 경우 problem_type을 "Best"로 설정
  const params: Record<string, any> = {
    page,
    page_size: 20,
    ...filters,
  };

  // recommended이 Yes일 경우 problem_type을 "Best"로 설정
  if (filters.recommended === 'Yes') {
    params.problem_type = 'Premium';
  } else {
    delete params['problem_type'];
  }

  // 빈 문자열이나 undefined인 파라미터는 제거
  Object.keys(params).forEach(
    (key) =>
      (params[key] === '' ||
        params[key] === 'All' ||
        params[key] === 'None' ||
        params[key] === null ||
        params[key] === undefined) &&
      delete params[key],
  );

  delete params['recommended'];

  const response = await axios.get<ProblemsResponse>('/store/list', {
    params,
  });

  return response.data;
};

const useProblemList = (filters: FormData, page: number) => {
  return useQuery({
    queryKey: ['problems', filters, page],
    queryFn: () => fetchProblemList(filters, page),
    staleTime: 1000 * 60 * 5, // 데이터 신선도 유지 시간 (5분)
    retry: 2, // 실패 시 재시도 횟수
  });
};

export default useProblemList;
