import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

interface ViewImageTitleSectionProps {
  title: string;
  imageUrl: string;
  isMobile: boolean;
}

const ViewImageTitleSection: React.FC<ViewImageTitleSectionProps> = ({
  title,
  imageUrl,
  isMobile,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#dfdfdf',
        borderRadius: 5,
        width: isMobile ? 310 : 340,
        height: isMobile ? 440 : 480,
      }}
    >
      <Image
        src={imageUrl || '/svgs/default-image.svg'}
        alt={title}
        width={isMobile ? 310 : 340}
        height={isMobile ? 440 : 480}
        style={{
          cursor: 'pointer',
          borderRadius: '10px',
          transition: 'transform 0.3s ease-in-out',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
};

export default ViewImageTitleSection;
