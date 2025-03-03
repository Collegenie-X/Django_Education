// components/Reviews/ReviewItem.tsx
import React from 'react';
import {
  Box,
  Typography,
  Rating,
  IconButton,
  Collapse,
  Button,
} from '@mui/material';
import { FiEdit, FiTrash, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Image from 'next/image';
import { ReviewProps, WriterComment } from '@/hooks/useProblemReview';
import { useState } from 'react';
import { formatDate } from '@/utiles/formatDate';
import { WriterCommentItem } from './Comments/CommentItems';

interface ReviewItemProps {
  review: ReviewProps;
  isWriter: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  isWriter,
  onEdit,
  onDelete,
}) => {
  const [openComments, setOpenComments] = useState<boolean>(false);

  const toggleComments = () => {
    setOpenComments(!openComments);
  };

  return (
    <Box mb={4} display="flex" alignItems="flex-start">
      {/* User Avatar */}
      <Box
        sx={{
          width: 56,
          height: 56,
          backgroundColor: '#ececec',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
      >
        <Image
          src="/svgs/user-tag.png"
          width={35}
          height={35}
          alt="User Avatar"
        />
      </Box>

      <Box flex={1} sx={{ ml: 2, pr: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {review.user.split('@')[0]}
            </Typography>

            <Typography variant="caption" color="textSecondary">
              {formatDate(review.created_at)}
            </Typography>

            <Typography mt={1} sx={{ fontSize: 16 }}>
              {review.comment}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={'column'}
            justifyContent="space-between"
            alignItems="center"
          >
            <Rating
              name="read-only"
              value={review.rating}
              precision={0.5}
              readOnly
              icon={
                <Image
                  src="/svgs/star-filled.svg"
                  width={20}
                  height={20}
                  alt="star"
                />
              }
              emptyIcon={
                <Image
                  src="/svgs/star-empty.svg"
                  width={20}
                  height={20}
                  alt="star"
                />
              }
            />
            {/* Edit and Delete buttons */}
            {isWriter && (
              <Box display={'flex'} gap={1} mt={1}>
                <IconButton onClick={onEdit} sx={{ mx: -1 }}>
                  <FiEdit size={20} color={'#acacac'} />
                </IconButton>
                <IconButton onClick={onDelete} sx={{ mx: -1 }}>
                  <FiTrash size={20} color={'#acacac'} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        {/* Writer Comments Toggle Button */}
        {review.writer_comments && review.writer_comments.length > 0 && (
          <Box mt={2}>
            <Button
              variant="text"
              size="small"
              onClick={toggleComments}
              startIcon={openComments ? <FiChevronUp /> : <FiChevronDown />}
            >
              {openComments
                ? 'Hide Comments'
                : `Show ${review.writer_comments.length} Comment(s)`}
            </Button>
            <Collapse in={openComments}>
              {review.writer_comments.map((comment) => (
                <WriterCommentItem key={comment.id} comment={comment} />
              ))}
            </Collapse>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ReviewItem;
