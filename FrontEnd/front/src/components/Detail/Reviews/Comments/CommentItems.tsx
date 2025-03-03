import { WriterComment } from '@/hooks/useProblemReview';
import { formatDate } from '@/utiles/formatDate';
import { Box, Typography } from '@mui/material';

export const WriterCommentItem: React.FC<{ comment: WriterComment }> = ({
  comment,
}) => {
  return (
    <Box
      ml={8}
      mt={2}
      mb={2}
      p={2}
      gap={1}
      bgcolor="#fafafa"
      borderRadius="8px"
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: 14 }}>
          {comment.user}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontSize: 12,
            mt: 0.5,
            letterSpacing: -0.5,
            wordSpacing: -0.5,
            gap: 0.5,
          }}
        >
          {formatDate(comment.created_at)}
        </Typography>
      </Box>

      <Typography sx={{ fontSize: 14, color: '#5c5c5c' }}>
        {comment.content}
      </Typography>
    </Box>
  );
};
