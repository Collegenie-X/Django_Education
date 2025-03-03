// src/hooks/useUserProfile.ts
import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile, UserProfile } from '@/api/ApiUser';

export const useUserProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터가 새로워지지 않음
  });
};
