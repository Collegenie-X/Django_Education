'use client';
import React, { useState } from 'react';
import { Box, Tabs, Tab, useMediaQuery, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TermsConditionsComponent from '@/components/Terms/TermsConditionsComponent';
import PaymentServiceOperatingPolicy from '@/components/Terms/PaymentServiceOperatingPolicy';
import TemsServicePaidServiceComponent from '@/components/Terms/TemsServicePaidServiceComponent';
import OperationPolicyComponent from '@/components/Terms/OperationPolicyComponent';
import { CONTENT_WIDTH } from '@/config/config';

const PrivacyPolicy: React.FC = () => {
  const [value, setValue] = useState(0);

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm')); // sm 이하일 때 true

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: CONTENT_WIDTH,
        mx: 'auto',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        orientation={isSmDown ? 'horizontal' : 'horizontal'} // sm 이하일 때 세로 정렬
        variant="scrollable"
        centered={isSmDown} // sm 이하일 때 가운데 정렬 적용
        sx={{
          mt: isSmDown ? 1 : 2,
          ml: isSmDown ? 1 : 14, // sm 이하일 때 자동 중앙 정렬
          '& .MuiTabs-indicator': {
            backgroundColor: 'black', // 밑줄 바를 검정색으로 변경
          },
          '& .MuiTab-root': {
            color: '#9c9c9c !important', // 탭 색깔을 변경
            textTransform: 'none',
            fontSize: isSmDown ? 14 : 14, // sm 이하일 때 폰트 크기 크게
          },
          '& .Mui-selected': {
            color: '#5c5c5c !important',
            fontWeight: 'bold',
          },
        }}
      >
        <Tab label="Terms of Service" />
        <Tab label="Payment Service Operating Policy" />
        <Tab label="Paid Service Terms of Use" />
        <Tab label="Operation Policy" />
      </Tabs>

      <Box sx={{ p: { sm: 1, md: 3 }, mt: 3 }}>
        {value === 0 && <TermsConditionsComponent />}
        {value === 1 && <PaymentServiceOperatingPolicy />}
        {value === 2 && <TemsServicePaidServiceComponent />}
        {value === 3 && <OperationPolicyComponent />}
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
