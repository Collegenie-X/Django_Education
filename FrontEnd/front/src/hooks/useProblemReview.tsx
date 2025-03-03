import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getStoreProblemReview,
  createStoreProblemReview,
  updateStoreProblemReview,
  deleteStoreProblemReview,
} from '@/api/ApiReivews';

// Review 인터페이스 정의
export interface WriterComment {
  id: number;
  user: string;
  review: number;
  content: string;
  created_at: string;
}

export interface ReviewProps {
  id: number;
  user: string;
  email: string;
  rating: number;
  comment: string;
  created_at: string;
  writer_comments: WriterComment[]; // 추가된 부분
}
const useStoreReview = (problem_id: string) => {
  const queryClient = useQueryClient();

  // 리뷰 가져오기
  const {
    data: reviews,
    error,
    isLoading,
    isError,
  } = useQuery<ReviewProps[], Error>({
    queryKey: ['storeReviews', problem_id],
    queryFn: () => getStoreProblemReview(problem_id),
    // enabled: !!problem_id,
    // staleTime: 1000 * 60 * 1, // 5분
    retry: 2, // 실패 시 2번 재시도
  });

  // 리뷰 생성
  const createReviewMutation = useMutation({
    mutationFn: async ({
      rating,
      comment,
    }: {
      rating: string;
      comment: string;
    }) => createStoreProblemReview(problem_id, rating, comment),
    onSuccess: () => {
      // 새로운 리뷰가 생성되면 리뷰 목록을 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ['storeReviews', problem_id] });
    },
    onError: (error: any) => {
      console.error('Failed to create review: ', error);
    },
  });

  // 리뷰 수정
  const updateReviewMutation = useMutation({
    mutationFn: async ({
      review_id,
      rating,
      comment,
    }: {
      review_id: string;
      rating: string;
      comment: string;
    }) => updateStoreProblemReview(review_id, rating, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storeReviews', problem_id] });
    },
    onError: (error: any) => {
      console.error('Failed to update review: ', error);
    },
  });

  // 리뷰 삭제
  const deleteReviewMutation = useMutation({
    mutationFn: async (review_id: string) =>
      deleteStoreProblemReview(review_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storeReviews', problem_id] });
    },
    onError: (error: any) => {
      console.error('Failed to delete review: ', error);
    },
  });

  return {
    reviews,
    error,
    isError,
    isLoading,
    createReviewMutation,
    updateReviewMutation,
    deleteReviewMutation,
  };
};

export default useStoreReview;
