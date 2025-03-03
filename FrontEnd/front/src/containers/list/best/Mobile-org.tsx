// components/MainPageMobile.tsx
'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import EducationalWorkbooks from '@/components/Store/EducationalWorkbooks';
import StoreCarousel from '@/components/Store/Carousel/StoreCarousel';
import { StoreSection } from '@/types/store'; // StoreSection 인터페이스 임포트
import Image from 'next/image';
import LoadingSkeleton from '@/components/Skeleton/LoadingSkeleton';
import { useRouter } from 'next/navigation';

interface MainPageMobileProps {
  sections: StoreSection[];
}

const MainPageMobile: React.FC<MainPageMobileProps> = ({ sections }) => {
  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  return (
    <Box sx={{ p: 0 }}>
      <EducationalWorkbooks />

      {sections.map((section, sectionIndex) => {
        const itemsToDisplay = section.items; // 필요에 따라 sliceCount 적용 가능

        if (
          !section.isLoading &&
          !section.error &&
          itemsToDisplay.length === 0
        ) {
          return null;
        }

        return (
          <Box
            key={section.title}
            sx={{
              mt: sectionIndex === 0 ? 0 : 5,
            }}
          >
            <Box
              onClick={() =>
                handleNavigation(
                  `/subject?subject=${section.title}&recommended=No`,
                )
              } // URL 로직에 맞게 수정
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 1,
                gap: 1,
                cursor: 'pointer',
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNavigation(
                    `/subject?subject=${section.title}&recommended=No`,
                  );
                }
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 20, sm: 24 },
                  color: 'inherit',
                }}
              >
                {section.title}
              </Typography>
              <Image
                src={'/svgs/left_arrow.svg'}
                width={16}
                height={16}
                alt={'arrow left'}
              />
            </Box>

            <Box sx={{ mt: { xs: 1, sm: 2 } }}>
              {section.isLoading ? (
                <Box sx={{ mt: { xs: 1, sm: 4 }, ml: { xs: 2, sm: 0 } }}>
                  <LoadingSkeleton />
                </Box>
              ) : section.error ? (
                <Typography color="error">
                  {section.title} 로딩 중 오류 발생: {section.error.message}
                </Typography>
              ) : itemsToDisplay.length > 0 ? (
                <StoreCarousel items={itemsToDisplay} />
              ) : (
                <Typography>아이템을 찾을 수 없습니다.</Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default MainPageMobile;
