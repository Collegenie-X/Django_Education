import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface RatingSectionProps {
  totalScore: number;
  totalComments: number;
}

const RatingSection: React.FC<RatingSectionProps> = ({
  totalScore,
  totalComments,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
    }}
  >
    <Image src="/svgs/star.svg" width={15} height={15} alt="star" />
    <Typography sx={{ fontSize: 16 }}>
      {totalScore} <span style={{ color: '#b9b9b9' }}>({totalComments})</span>
    </Typography>
  </Box>
);

export default RatingSection;
