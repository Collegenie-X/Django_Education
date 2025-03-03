import React from 'react';
import { Box, Typography } from '@mui/material';

interface ViewDescriptionSectionProps {
  description: string;
}

const ViewDescriptionSection: React.FC<ViewDescriptionSectionProps> = ({
  description,
}) => {
  return (
    <Box sx={{ width: '100%', px: { xs: 1, sm: 1, lg: 0 } }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: '#5c5c5c', fontWeight: 'bold' }}
      >
        Description
      </Typography>
      <Typography
        paragraph
        sx={{
          fontSize: { sx: 16, sm: 18 },
          textAlign: { sm: 'left', md: 'left' },
          display: 'flex',
          flexWrap: 'wrap',
          color: '#5c5c5c',
          letterSpacing: 0.1,
          lineHeight: 1.5,
          wordSpacing: 2,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ViewDescriptionSection;
