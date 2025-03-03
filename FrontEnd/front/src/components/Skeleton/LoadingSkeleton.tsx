import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

interface LoadingSkeletonProps {
  array_columns?: number; // 한 줄에 몇 개의 스켈레톤을 생성할지 정하는 옵션, 기본값은 1
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  array_columns = 1,
}) => {
  // array_columns에 따른 총 스켈레톤 수 계산
  const skeletonCount = array_columns * 5; // 한 줄에 5개의 스켈레톤

  // skeletonCount만큼의 스켈레톤을 생성하기 위해 배열을 만듭니다.
  const skeletonArray = Array.from({ length: skeletonCount });

  return (
    <Box sx={{ pt: 2, overflow: 'hidden' }}>
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          flexWrap: skeletonArray.length < 6 ? 'nowrap' : 'wrap',
          overflowX: skeletonArray.length < 6 ? 'auto' : 'hidden', // 가로 스크롤 숨김 또는 보이기
        }}
      >
        {skeletonArray.map((_, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2.4}
            key={index}
            sx={{
              height: '100%',
              flexShrink: 0, // 요소가 줄어들지 않도록 설정
              maxWidth: skeletonArray.length < 6 ? 270 : undefined, // 5개 미만일 경우 최대 너비를 고정
            }}
          >
            {/* Box 컴포넌트의 크기 조정 */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                height: '100%',
                width: 270,
              }}
            >
              {/* 이미지 부분을 위한 Skeleton */}
              <Skeleton
                variant="rectangular"
                width={260}
                height={300}
                animation="wave"
                sx={{ borderRadius: 5 }}
              />
              {/* 제목 부분을 위한 Skeleton */}
              <Skeleton
                variant="text"
                width="95%"
                height={40}
                animation="wave"
              />
              {/* 가격 정보 부분을 위한 Skeleton */}
              <Box display={'flex'} justifyContent={'space-between'} mr={1}>
                <Skeleton
                  variant="text"
                  width="40%"
                  height={20}
                  animation="wave"
                />

                <Skeleton
                  variant="text"
                  width="40%"
                  height={20}
                  animation="wave"
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LoadingSkeleton;
