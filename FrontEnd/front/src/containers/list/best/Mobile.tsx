// components/MainPageMobile.tsx
'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import EducationalWorkbooks from '@/components/Store/EducationalWorkbooks';
import { StoreSection } from '@/types/store'; // StoreSection 인터페이스 임포트
import Image from 'next/image';
import LoadingSkeleton from '@/components/Skeleton/LoadingSkeleton';
import { useRouter } from 'next/navigation';
import PriceSection from '@/components/Store/CardItem/PriceSection';
import RatingSection from '@/components/Store/CardItem/RatingSection';

interface MainPageMobileProps {
  sections: StoreSection[];
}

const MainPageMobile: React.FC<MainPageMobileProps> = ({ sections }) => {
  const router = useRouter();

  const MOBILE_WIDTH = 180;
  const MOBILE_HEIGHT = 230;

  const handleNavigation = (title: string) => {
    const url =
      title === 'For Kids'
        ? '/subject?subject=All&grade=Kindergarten&recommended=No'
        : `/subject?subject=${title}&recommended=No`;

    router.push(url);
  };

  const handleImageClick = (id: number) => {
    router.push(`/store/${id}`);
  };

  return (
    <Box sx={{ p: 0 }}>
      <EducationalWorkbooks />

      {sections.map((section, index) => (
        <Box
          key={index}
          sx={{
            background: '#eaeaea',
            width: '100%',
            mx: 'auto',
            my: 2,
            borderRadius: 5,
            pl: 3,
          }}
        >
          <>
            <Box
              display={'flex'}
              sx={{ alignItems: 'center', pt: 3, gap: 2, cursor: 'pointer' }}
              onClick={() => handleNavigation(section.title)}
            >
              <Typography sx={{ fontSize: 28 }}>{section.title}</Typography>
              <Image
                src={'/svgs/left_arrow.svg'}
                width={20}
                height={20}
                alt={'arrow left'}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                overflowX: 'scroll',
                gap: 1.5,
                py: 4,
              }}
            >
              {section.items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    minWidth: MOBILE_WIDTH,
                    height: MOBILE_HEIGHT,
                    borderRadius: 3,
                    mx: 1,
                    mb: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImageClick(item.id)}
                >
                  {/* 첫 번째 미리보기 이미지 표시 */}
                  {item.preview_images && item.preview_images.length > 0 && (
                    <Image
                      src={item.preview_images[0].image_url} // preview_images의 첫 번째 이미지 URL
                      alt={item.title} // 대체 텍스트
                      width={MOBILE_WIDTH - 10} // 원하는 너비
                      height={MOBILE_HEIGHT - 10} // 원하는 높이
                      style={{
                        borderRadius: 3,
                        objectFit: 'cover',
                      }} // 스타일 조정
                    />
                  )}

                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <PriceSection
                      isFree={item.is_free}
                      price={Number(item.price)}
                      discountedPrice={Number(item.discounted_price)}
                    />
                    <RatingSection
                      totalScore={Number(item.total_score)}
                      totalComments={Number(item.total_comments)}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        </Box>
      ))}
    </Box>
  );
};

export default MainPageMobile;
