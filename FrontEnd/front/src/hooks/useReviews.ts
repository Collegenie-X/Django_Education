// hooks/useReviews.ts
import { useState, useEffect } from 'react';
import useStoreReview, { ReviewProps } from '@/hooks/useProblemReview';
import { useAuth } from '@/context/AuthContext';
import { cookieUtils } from '@/utiles/cookieUtils';

interface UseReviewsProps {
  problem_id: string;
  isFree: boolean;
  isPayment: boolean;
}

const useReviews = ({ problem_id, isFree, isPayment }: UseReviewsProps) => {
  const {
    reviews,
    isLoading,
    isError,
    error,
    createReviewMutation,
    deleteReviewMutation,
    updateReviewMutation,
  } = useStoreReview(problem_id);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [editReview, setEditReview] = useState<ReviewProps | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 삭제 확인 다이얼로그 상태
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<number | null>(null);

  const currentUser = cookieUtils.getCookie('username');

  const isReviewWriter = (review: ReviewProps) => review.user === currentUser;

  // 사용자 리뷰 확인
  useEffect(() => {
    if (reviews) {
      const userReview = reviews.find(
        (review) => review.email === String(cookieUtils.getCookie('email')),
      );
      setHasReviewed(!!userReview);
    }
  }, [reviews]);

  // 리뷰 작성 버튼 클릭 핸들러
  const handleWriteReviewClick = () => {
    if (hasReviewed) {
      alert('You have already submitted a review for this problem.');
      return;
    }
    if (!currentUser) {
      setLoginDialogOpen(true);
      return;
    }
    if (isFree) {
      setDialogOpen(true);
      return;
    }

    if (isPayment) {
      setDialogOpen(true);
      return;
    }

    alert('You can only write a review after purchase.');
  };

  // **다운로드 버튼 클릭 핸들러 추가**
  const handleDownloadClick = () => {
    if (isFree) {
      // 무료인 경우 결제를 유도하는 다이얼로그 열기
      setDialogOpen(true);
      return;
    }

    if (isPayment) {
      setDialogOpen(true);
      return;
    }

    // 결제가 완료된 경우 다운로드 로직 실행
    initiateDownload();
  };

  // 다운로드 로직을 구현하는 함수 (구체적인 구현은 필요에 따라 추가)
  const initiateDownload = () => {
    // 예: 파일 다운로드를 위한 URL 호출
    window.location.href = `/download/problem/${problem_id}`;
  };

  // 리뷰 제출 핸들러
  const handleSubmitReview = (rating: number | null, comment: string) => {
    if (rating) {
      if (editReview) {
        // 수정할 때는 updateReviewMutation 사용
        updateReviewMutation.mutate(
          {
            review_id: String(editReview.id),
            rating: rating.toString(),
            comment,
          },
          {
            onSuccess: () => {
              setDialogOpen(false);
              setEditReview(null);
              setErrorMessage(null);
            },
            onError: (error: any) => {
              console.log('Error updating review:', error);
              handleError(error);
            },
          },
        );
      } else {
        // 새로운 리뷰 생성
        createReviewMutation.mutate(
          { rating: rating.toString(), comment },
          {
            onSuccess: () => {
              setDialogOpen(false);
              setErrorMessage(null);
            },
            onError: (error: any) => {
              console.error('Error creating review:', error);
              handleError(error);
            },
          },
        );
      }
    }
  };

  // 리뷰 수정 클릭 핸들러
  const handleEditClick = (review: ReviewProps) => {
    setEditReview(review);
    setDialogOpen(true);
  };

  // 리뷰 삭제 클릭 핸들러
  const handleDeleteClick = (review_id: number) => {
    setReviewIdToDelete(review_id); // 삭제할 리뷰 ID 설정
    setDeleteDialogOpen(true); // 다이얼로그 열기
  };

  // 리뷰 삭제 확인 핸들러
  const handleConfirmDelete = () => {
    if (reviewIdToDelete !== null) {
      deleteReviewMutation.mutate(String(reviewIdToDelete), {
        onSuccess: () => {
          console.log('Review deleted successfully.');
          setDeleteDialogOpen(false); // 다이얼로그 닫기
          setReviewIdToDelete(null); // 리뷰 ID 초기화
        },
        onError: (error: any) => {
          handleError(error);
        },
      });
    }
  };

  // 에러 처리 함수
  const handleError = (error: any) => {
    if (error?.response) {
      const { detail } = error.response.data;
      if (detail) {
        if (
          detail === 'You have already submitted a review for this problem.'
        ) {
          setErrorMessage(detail);
        } else if (detail === 'Given token not valid for any token type') {
          setDialogOpen(false);
          setLoginDialogOpen(true);
          setErrorMessage('You have logged in using an invalid token.');
        } else if (detail === 'User not found') {
          setDialogOpen(false);
          setLoginDialogOpen(true);
          setErrorMessage('User not found');
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } else {
      if (error?.message === 'Token not found') {
        setDialogOpen(false);
        setLoginDialogOpen(true);
      } else {
        setErrorMessage(
          'Network error. Please check your connection and try again.',
        );
      }
    }
  };

  // 리뷰 더보기/줄이기 핸들러
  const handleToggleShow = () => {
    setShowAll(!showAll);
  };

  // 로그인 성공 핸들러
  const handleLoginSuccess = (email: string) => {
    setErrorMessage(null);
    // 추가적인 로그인 성공 후 처리 로직이 필요하면 여기에 추가
  };

  return {
    reviews,
    isLoading,
    isError,
    error,
    dialogOpen,
    setDialogOpen,
    loginDialogOpen,
    setLoginDialogOpen,
    editReview,
    setEditReview,
    showAll,
    setShowAll,
    hasReviewed,
    setHasReviewed,
    errorMessage,
    setErrorMessage,
    isReviewWriter,
    handleWriteReviewClick,
    handleSubmitReview,
    handleEditClick,
    handleDeleteClick,
    handleToggleShow,
    handleError,
    handleLoginSuccess,
    handleConfirmDelete, // 삭제 확인 핸들러 추가
    deleteDialogOpen, // 다이얼로그 상태 추가
    setDeleteDialogOpen, // 다이얼로그 상태 설정 함수 추가
    // **추가된 핸들러 반환**
    handleDownloadClick,
  };
};

export default useReviews;
