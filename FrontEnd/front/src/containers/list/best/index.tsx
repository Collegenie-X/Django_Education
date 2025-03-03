// pages/index.tsx 또는 components/MainPage.tsx
'use client';

import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import MainPageDesktop from './Desktop';
import MainPageMobile from './Mobile';
import { useStoreList } from '@/hooks/useBestProblemList';

const MainPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 'sm'은 기본적으로 600px을 의미

  // 공통으로 사용할 섹션 설정
  const storeSections = [
    {
      title: 'SAT',
      queryParams: { subject: 'SAT', problem_type: 'Normal' },
      url: '/subject?subject=SAT&recommended=No',
    },
    {
      title: 'Bundle',
      queryParams: { problem_type: 'Premium' },
      url: '/subject?subject=All&recommended=Yes',
    },
    {
      title: 'For Kids',
      queryParams: { grade: 'Kindergarten' },
      url: '/subject?subject=All&grade=Kindergarten&recommended=No',
    },
    // 필요한 섹션 추가
  ];

  // 데이터 가져오기
  const { sections } = useStoreList(storeSections);

  return isMobile ? (
    <MainPageMobile sections={sections} />
  ) : (
    <MainPageDesktop sections={sections} />
  );
};

export default MainPage;
