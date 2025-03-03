import React, { useState, useEffect } from 'react';
import { Box, ButtonBase } from '@mui/material';
import { CONTENT_WIDTH } from '@/config/config';

interface SlideData {
  image: string;
  url: string;
}

const slides: SlideData[] = [
  {
    image: '/images/banner_1.png',
    url: '/',
  },
  {
    image: '/images/banner_2.png',
    url: '/',
  },
  {
    image: '/images/banner_3.png',
    url: '/',
  },
  {
    image: '/images/banner_4.png',
    url: '/',
  },
];

const BannerSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // 5초마다 슬라이드 전환
    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Box position="relative" width="100%" height="400px">
      {slides.map((slide, index) => (
        <Box
          key={index}
          display={activeIndex === index ? 'block' : 'none'}
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            mx={'auto'}
            justifyContent="center"
            alignItems="center"
            maxWidth={CONTENT_WIDTH}
            height={120}
            color="white"
            textAlign="center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          ></Box>
        </Box>
      ))}

      {/* 인디케이터 */}
      <Box
        display="flex"
        justifyContent="center"
        position="absolute"
        bottom="20px"
        width="100%"
      >
        {slides.map((_, index) => (
          <ButtonBase
            key={index}
            onClick={() => handleIndicatorClick(index)}
            sx={{
              width: activeIndex === index ? '24px' : '12px', // 선택된 부분은 직사각형
              height: '12px',
              margin: '0 6px',
              borderRadius: activeIndex === index ? '6px' : '50%', // 선택된 부분은 약간 둥근 직사각형, 나머지는 원형
              backgroundColor: activeIndex === index ? '#ADD8E6' : '#ffffff', // 선택된 부분은 엷은 파란색, 선택되지 않은 부분은 흰색
              transition: 'all 0.3s ease', // 애니메이션 효과
              border: activeIndex === index ? 'none' : '1px solid #c4c4c4', // 선택되지 않은 부분에 테두리 추가
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BannerSlider;
