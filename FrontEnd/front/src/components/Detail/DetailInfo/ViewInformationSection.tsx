import React from 'react';
import { Box, Typography } from '@mui/material';
import { stringify } from 'querystring';

interface InformationItem {
  label: string;
  value: string;
}

interface ViewInformationSectionProps {
  items: InformationItem[];
}

const ViewInformationSection: React.FC<ViewInformationSectionProps> = ({
  items,
}) => {
  return (
    <Box sx={{ ml: { xs: 1, sm: 1, md: 7 }, mt: { xs: 2, sm: 0 } }}>
      <Typography
        sx={{
          fontSize: { xs: 20, sm: 24 },
          fontWeight: 'bold',
          color: '#3c3c3c',
        }}
      >
        Problem Detail
      </Typography>
      <Box>
        {items.length > 0 &&
          items.map((item, index) => (
            <Box key={index} sx={{ mt: 1.5 }}>
              <Typography
                sx={{
                  color: '#acacac',
                  fontSize: { xs: 13, sm: 15 },
                  mb: -0.5,
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 16, sm: 18 },
                  color: '#5c5c5c',
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                  overflowWrap: 'break-word',
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default ViewInformationSection;
