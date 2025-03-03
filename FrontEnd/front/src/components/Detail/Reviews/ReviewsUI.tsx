// components/Reviews/ReviewsUI.tsx
import React from 'react';
import { Box, Typography, Rating, Button } from '@mui/material';
import Image from 'next/image';
import ReviewItem from './ReviewItem';
import ReviewHeader from './ReviewHeader';
import ReviewDialog from './Dialog/ReviewDialog';
import PopupGoogleLogin from '@/components/Auth/PopupGoogleLogin';
import { ReviewProps } from '@/hooks/useProblemReview';

interface ReviewsUIProps {
  reviews: ReviewProps[];
  totalReviews: number;
  averageRating: number;
  showAll: boolean;
  onToggleShow: () => void;
  onWriteReview: () => void;
  hasReviewed: boolean;
  isReviewWriter: (review: ReviewProps) => boolean;
  onEditClick: (review: ReviewProps) => void;
  onDeleteClick: (review_id: number) => void;
  dialogOpen: boolean;
  onCloseDialog: () => void;
  onSubmitReview: (rating: number | null, comment: string) => void;
  errorMessage: string | null;
  initialReview: ReviewProps | null;
  loginDialogOpen: boolean;
  setLoginDialogOpen: (open: boolean) => void;
  onLoginSuccess: (email: string) => void;
}

const ReviewsUI: React.FC<ReviewsUIProps> = ({
  reviews,
  totalReviews,
  averageRating,
  showAll,
  onToggleShow,
  onWriteReview,
  hasReviewed,
  isReviewWriter,
  onEditClick,
  onDeleteClick,
  dialogOpen,
  onCloseDialog,
  onSubmitReview,
  errorMessage,
  initialReview,
  loginDialogOpen,
  setLoginDialogOpen,
  onLoginSuccess,
}) => {
  return (
    <Box sx={{ width: '100%', mt: 10, ml: 3 }}>
      {/* Reviews Header */}
      <ReviewHeader onWriteReview={onWriteReview} hasReviewed={hasReviewed} />

      {/* Average Rating and Total Reviews */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Typography fontWeight="bold" sx={{ fontSize: 28 }}>
          {averageRating.toFixed(2)}
        </Typography>
        <Rating
          name="read-only"
          value={averageRating}
          precision={0.5}
          readOnly
          icon={
            <Image
              src="/svgs/star-filled.svg"
              width={22}
              height={22}
              alt="star"
            />
          }
          emptyIcon={
            <Image
              src="/svgs/star-empty.svg"
              width={22}
              height={22}
              alt="star"
            />
          }
          sx={{ gap: '5px' }}
        />
        <Typography variant="body2" color="textSecondary">
          ({totalReviews.toLocaleString()} Reviews)
        </Typography>
      </Box>

      {/* Individual Review List */}
      {reviews && reviews.length > 0 ? (
        reviews.map((review: ReviewProps) => (
          <ReviewItem
            key={review.id}
            review={review}
            isWriter={isReviewWriter(review)}
            onEdit={() => onEditClick(review)}
            onDelete={() => onDeleteClick(review.id)}
          />
        ))
      ) : (
        <Typography variant="body2" color="textSecondary" align="center">
          No reviews yet. Be the first to write a review!
        </Typography>
      )}

      {/* Show More Reviews Button */}
      {totalReviews > 10 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button onClick={onToggleShow} variant="text" color="primary">
            {showAll ? 'Show Less Reviews' : 'Show More Reviews'}
          </Button>
        </Box>
      )}

      {/* Review Dialog */}
      <ReviewDialog
        open={dialogOpen}
        onClose={onCloseDialog}
        onSubmit={onSubmitReview}
        errorMessage={errorMessage as string}
        initialRating={initialReview ? initialReview.rating : null}
        initialComment={initialReview ? initialReview.comment : ''}
        isEdit={!!initialReview}
      />

      {/* Google Login Popup */}
      <PopupGoogleLogin
        dialogOpen={loginDialogOpen}
        setDialogOpen={setLoginDialogOpen}
        onLoginSuccess={onLoginSuccess}
        onLoginCancel={() => {
          // 로그인 취소 시 처리 로직 (필요에 따라 구현)
        }}
      />
    </Box>
  );
};

export default ReviewsUI;
