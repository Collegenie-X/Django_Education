// components/Reviews/ReviewsContainer.tsx
import React from 'react';
import useReviews from '@/hooks/useReviews';
import ReviewsUI from './ReviewsUI';
import { CircularProgress, Box, Alert } from '@mui/material';
import { ReviewProps } from '@/hooks/useProblemReview';
import ConfirmDeleteDialog from './Dialog/ConfirmDeleteDialog';

interface ReviewsProps {
  problem_id: string;
  isFree: boolean;
  isPayment: boolean;
}

const ReviewsContainer: React.FC<ReviewsProps> = ({
  problem_id,
  isFree,
  isPayment,
}) => {
  const {
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
    handleLoginSuccess,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
  } = useReviews({ problem_id, isFree, isPayment });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ mt: 10 }}>
        <Alert severity="error">
          An error occurred while fetching reviews: {error?.message}
        </Alert>
      </Box>
    );
  }

  const totalReviews = reviews ? reviews.length : 0;
  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce(
          (sum: number, review: ReviewProps) => sum + review.rating,
          0,
        ) / reviews.length
      : 0;

  const displayedReviews = showAll ? reviews : reviews?.slice(0, 10) || [];

  return (
    <>
      <ReviewsUI
        reviews={displayedReviews || []}
        totalReviews={totalReviews}
        averageRating={averageRating}
        showAll={showAll}
        onToggleShow={handleToggleShow}
        onWriteReview={handleWriteReviewClick}
        hasReviewed={hasReviewed}
        isReviewWriter={isReviewWriter}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        dialogOpen={dialogOpen}
        onCloseDialog={() => {
          setDialogOpen(false);
          setEditReview(null);
        }}
        onSubmitReview={handleSubmitReview}
        errorMessage={errorMessage}
        initialReview={editReview}
        loginDialogOpen={loginDialogOpen}
        setLoginDialogOpen={setLoginDialogOpen}
        onLoginSuccess={handleLoginSuccess}
      />
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ReviewsContainer;
