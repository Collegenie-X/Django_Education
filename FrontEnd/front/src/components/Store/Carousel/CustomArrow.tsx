import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface CustomArrowProps {
  onClick?: () => void;
  direction: 'left' | 'right';
  currentSlide?: number;
  slideCount?: number;
  arrowColor?: string;
  arrowBackgroundColor?: string;
}

const CustomArrow: React.FC<CustomArrowProps> = ({
  onClick,
  direction,
  currentSlide = 0,
  slideCount = 0,
  arrowColor = '#000',
  arrowBackgroundColor = 'rgba(255,255,255,0.8)', // 기본 배경색
}) => {
  if (
    (direction === 'left' && currentSlide === 0) ||
    (direction === 'right' && currentSlide >= slideCount - 1)
  ) {
    return null;
  }

  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        [direction === 'left' ? 'left' : 'right']: 10,
        transform: 'translateY(-50%)',
        backgroundColor: arrowBackgroundColor, // 모든 방향에 흰색 배경색 적용
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.8)',
        },
        zIndex: 10,
        '& svg': {
          color: arrowColor,
          marginLeft: direction === 'left' ? '5px' : '0px', // 왼쪽 화살표 위치 조정
        },
        width: 40,
        height: 40,
      }}
      aria-label={direction === 'left' ? 'Previous Slide' : 'Next Slide'}
    >
      {direction === 'left' ? <ArrowBackIos /> : <ArrowForwardIos />}
    </IconButton>
  );
};

export default CustomArrow;
