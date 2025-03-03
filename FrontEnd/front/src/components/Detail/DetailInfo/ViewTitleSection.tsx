import React from 'react';
import { Typography } from '@mui/material';

interface ViewTitleSectionProps {
  title: string;
}

const ViewTitleSection: React.FC<ViewTitleSectionProps> = ({ title }) => {
  return (
    <Typography
      fontWeight="bold"
      gutterBottom
      sx={{ fontSize: { xs: 25, sm: 26, md: 29 }, lineHeight: '32px' }}
    >
      {title}
    </Typography>
  );
};

export default ViewTitleSection;
