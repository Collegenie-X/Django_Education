import React, { useState, useEffect } from 'react';
import { Box, ButtonBase, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface SlideData {
  image: string;
  url: string;
}

const slides: SlideData[] = [
  { image: '/images/main/banner_xl_1.png', url: '/subject' },
  { image: '/images/main/banner_xl_2.png', url: '/subject' },
  { image: '/images/main/banner_xl_3.png', url: '/free' },
  // { image: '/images/main/banner_xl_4.png', url: 'https://studyola.com/' },
];

const md_slides: SlideData[] = [
  { image: '/images/main/banner_md_1.png', url: '/subject' },
  { image: '/images/main/banner_md_2.png', url: '/subject' },
  { image: '/images/main/banner_md_3.png', url: '/free' },
  // { image: '/images/banner_md_4.png', url: 'https://studyola.com/' },
];

const sm_slides: SlideData[] = [
  { image: '/images/main/banner_sm_1.png', url: '/subject' },
  { image: '/images/main/banner_sm_2.png', url: '/subject' },
  { image: '/images/main/banner_sm_3.png', url: '/free' },
  // { image: '/images/banner_sm_4.png', url: 'https://studyola.com/' },
];

const BannerSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const router = useRouter();

  // 화면 크기에 따른 미디어 쿼리
  const isXs = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));

  // 화면 크기에 따라 슬라이드 배열 선택
  let currentSlides: SlideData[] = slides;
  if (isMd) {
    currentSlides = md_slides;
  } else if (isSm) {
    currentSlides = sm_slides;
  } else if (isXs) {
    currentSlides = sm_slides;
  }

  // 화면 크기에 따라 높이 조절
  let sliderHeight = 400;

  if (isXs) {
    sliderHeight = 240;
  } else if (isSm) {
    sliderHeight = 380;
  } else if (isMd) {
    sliderHeight = 380;
  } else if (isLg) {
    sliderHeight = 400;
  } else {
    sliderHeight = 420;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % currentSlides.length);
    }, 4500); // 4.5초마다 슬라이드 전환
    return () => clearInterval(interval);
  }, [currentSlides.length]);

  const handleUrlClick = (index: number) => {
    router.push(currentSlides[index].url);
  };

  const handleIndicatorClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setActiveIndex(index);
  };

  return (
    <Box position="relative" mb={isXs || isSm ? 5 : 15} sx={{ mx: -2 }}>
      {/* 모든 화면 크기에서 슬라이드 렌더링 */}
      {currentSlides.map((slide, index) => (
        <Box
          key={index}
          mx="auto"
          width="100%"
          height={`${sliderHeight}px`}
          onClick={() => handleUrlClick(index)}
          sx={{
            position: index === activeIndex ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            zIndex: index === activeIndex ? 1 : 0,
            opacity: index === activeIndex ? 1 : 0,
            transition: 'opacity 0.5s ease',
            backgroundColor:
              activeIndex || index === 0 ? 'transparent' : '#transparent',
            borderRadius: isXs ? 0 : 5,
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        >
          <Image
            src={slide.image}
            alt="Slider Image"
            fill
            style={{ objectFit: 'fill' }}
          />

          {/* 인디케이터 */}
          <Box
            display="flex"
            justifyContent="center"
            position="absolute"
            width="100%"
            zIndex={20}
            sx={{
              bottom: { xs: 10, sm: 10, md: 20, lg: 20, xl: 10 },
              px: 2,
              py: { xs: 0, sm: 0, md: 1 },
            }}
          >
            {currentSlides.map((_, index) => (
              <ButtonBase
                key={index}
                onClick={(event) => handleIndicatorClick(index, event)}
                sx={{
                  width: activeIndex === index ? '24px' : '12px',
                  height: '12px',
                  margin: '0 6px',
                  py: 0.5,
                  px: 0.5,
                  borderRadius: activeIndex === index ? '6px' : '50%',
                  backgroundColor:
                    activeIndex === index ? '#2BA8FF' : '#ffffff',
                  transition: 'all 0.3s ease',
                  zIndex: 21,
                }}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default BannerSlider;
