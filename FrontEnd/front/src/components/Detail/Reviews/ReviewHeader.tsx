// components/Reviews/ReviewHeader.tsx
import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

interface ReviewHeaderProps {
  onWriteReview: () => void;
  hasReviewed: boolean;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  onWriteReview,
  hasReviewed,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  return (
    <Box
      sx={{
        mb: 5,
        mr: 5,
        ml: isSm ? -2 : 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Reviews
      </Typography>

      {hasReviewed ? (
        <Typography
          gutterBottom
          sx={{
            fontSize: isSm ? 13 : 14,
            letterSpacing: isSm ? -0.8 : 0.1,
            color: '#acacac',
          }}
        >
          You have already submitted a review
        </Typography>
      ) : (
        <Typography
          color={'#59B7FE'}
          gutterBottom
          sx={{ fontSize: 18, cursor: 'pointer' }}
          onClick={onWriteReview}
        >
          Write a review
        </Typography>
      )}
    </Box>
  );
};

export default ReviewHeader;
