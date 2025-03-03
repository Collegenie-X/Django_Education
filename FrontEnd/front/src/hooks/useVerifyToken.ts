// src/hooks/useVerifyToken.ts
import { useQuery } from '@tanstack/react-query';
import { verifyToken } from '@/api/ApiUser';

// 응답 데이터 타입 정의
interface VerifyTokenResponse {
  is_valid: boolean;
  user?: {
    email: string;
    // 필요에 따라 다른 사용자 필드를 추가하세요
  };
}

// 토큰 검증을 위한 API 호출 함수
const fetchVerifyToken = async (): Promise<VerifyTokenResponse> => {
  const response = await verifyToken();

  // 응답 데이터 유효성 검사
  if (!response || typeof response.is_valid !== 'boolean') {
    throw new Error('Invalid token verification response');
  }

  return response;
};

// 커스텀 훅 정의
const useVerifyToken = () => {
  return useQuery<VerifyTokenResponse, Error>({
    queryKey: ['verifyToken'],
    queryFn: fetchVerifyToken,
    staleTime: 5 * 60 * 1000, // 5분
    retry: 2, // 실패 시 2번 재시도
  });
};

export default useVerifyToken;
