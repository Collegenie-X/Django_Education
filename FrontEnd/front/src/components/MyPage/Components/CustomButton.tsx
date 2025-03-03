import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
  label: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick }) => {
  return (
    <Button
      variant="text"
      sx={{
        px: 1.5,
        py: 0.3,
        borderRadius: 5,
        border: '1px solid #ccc',
        textTransform: 'none',
        color: '#cecece',
        cursor: 'pointer',
        fontSize: 12,
        ':hover': {
          border: '1px solid #b9dffe', // hover border
          color: '#b9dffe',
          backgroundColor: '#fafeff', // hover 스타일
        },
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
