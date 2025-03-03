import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Rating,
  TextField,
  Button,
  Alert,
  IconButton,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/system';

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number | null, comment: string) => void;
  errorMessage?: string;
  initialRating?: number | null; // 수정 시 초기 별점 값
  initialComment?: string; // 수정 시 초기 댓글 값
  isEdit?: boolean; // 수정 모드 여부
}

// Custom styled TextField with border, border-radius, and placeholder styles
const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px', // Border-radius for the TextField
    borderColor: '#fff',
    '& fieldset': {
      borderColor: '#dcdcdc',
    },
    '&:hover fieldset': {
      borderColor: '#dcdcdc', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#dcdcdc', // Border color when focused
    },
  },
  '& .MuiInputBase-input': {
    fontSize: '14px', // Font size for the input text
    color: '#5c5c5c', // Font color for the input text
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#ccc', // Placeholder color
    opacity: 1, // Ensure the placeholder color is fully applied
    fontSize: '13px', // Placeholder font size
  },
});

const ReviewDialog: React.FC<ReviewDialogProps> = ({
  open,
  onClose,
  onSubmit,
  errorMessage,
  initialRating = null, // 초기 별점 기본 값 설정
  initialComment = '', // 초기 댓글 기본 값 설정
  isEdit = false, // 수정 모드 여부
}) => {
  const [rating, setRating] = useState<number | null>(initialRating); // 별점 state 초기화
  const [comment, setComment] = useState<string>(initialComment); // 댓글 state 초기화

  // 다이얼로그가 열릴 때 초기 별점 및 댓글을 설정
  useEffect(() => {
    setRating(initialRating);
    setComment(initialComment);
  }, [initialRating, initialComment]);

  const handleSubmit = () => {
    if (rating) {
      onSubmit(rating, comment);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Review
        {/* Close button with resizable X icon */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
          }}
        >
          <Image
            src={'/svgs/close-receipt.svg'}
            width={20} // Adjust icon width
            height={20} // Adjust icon height
            alt="Close"
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          mb={2}
        >
          {errorMessage && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: 13, color: '#3c3c3c' }}>
              Product Rating
            </Typography>

            <Rating
              sx={{ gap: 0.8 }}
              name="user-rating"
              value={rating}
              size="large" // Adjust the size of the stars
              onChange={(event, newValue) => setRating(newValue)}
              icon={
                <Image
                  src="/svgs/star-filled.svg"
                  width={24}
                  height={24}
                  alt="star"
                />
              } // Custom filled star icon
              emptyIcon={
                <Image
                  src="/svgs/star-empty.svg"
                  width={24}
                  height={24}
                  alt="star"
                />
              } // Custom empty star icon
            />
          </Box>

          <Box sx={{ mt: 3, width: '100%' }}>
            <Typography sx={{ fontSize: 13, color: '#3c3c3c' }}>
              Comments
            </Typography>
            <CustomTextField
              fullWidth
              multiline
              rows={6}
              placeholder="Please share your experience with the product."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              fontSize: 18,
              bgcolor: '#2BA8FF',
              height: '50px',
              textTransform: 'none',
              borderRadius: '8px',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2297DD', // Hover color on submit button
                color: 'white', // Hover text color on submit button
              },
            }}
          >
            {isEdit ? 'Update' : 'Submit'} {/* 수정 시 텍스트 변경 */}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
