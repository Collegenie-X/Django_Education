'use client';
// src/pages/MyPage.tsx
import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, CircularProgress } from '@mui/material';
import Profile from '@/components/MyPage/Profile';
import Payments from '@/components/MyPage/Payments';
import ReportDetails from '@/components/MyPage/ReportDetails';
import Downloads from '@/components/MyPage/Downloads'; // Downloads 컴포넌트 추가
import PopupGoogleLogin from '@/components/Auth/PopupGoogleLogin';

import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import useVerifyToken from '@/hooks/useVerifyToken';

const MyPage: React.FC = () => {
  // Initialize with 'profile' as the default tab
  const [value, setValue] = useState<string>('profile');
  const router = useRouter();
  const params = useParams(); // Get URL parameters

  const { isLoggedIn, setIsLoggedIn, setEmail } = useAuth();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { data, isLoading, isError, error } = useVerifyToken();

  // 데이터가 변경될 때 상태 업데이트
  useEffect(() => {
    if (data) {
      if (data.is_valid && data.user) {
        setEmail(data.user.email);
        setIsLoggedIn(true);
      } else {
        setDialogOpen(true);
      }
    }
  }, [data, router]);

  // 에러 발생 시 다이얼로그 열기
  useEffect(() => {
    if (isError) {
      setDialogOpen(true);
    }
  }, [isError]);

  // Update the tab based on the URL slug
  useEffect(() => {
    let slug: string | undefined;

    if (Array.isArray(params?.slug)) {
      slug = params.slug[0]; // Take the first element if slug is an array
    } else {
      slug = params?.slug;
    }

    if (!slug) {
      // If no slug is present, redirect to the default tab
      router.replace('/my-page/profile');
    } else {
      // Define valid slugs
      const validSlugs = ['profile', 'downloads', 'payments', 'reports'];

      if (validSlugs.includes(slug)) {
        setValue(slug);
        router.replace(`/my-page/${slug}`);
      } else {
        // If invalid slug, redirect to the default tab
        router.replace('/my-page/profile');
      }
    }
  }, [params?.slug, router]);

  const handleLoginSuccess = () => {
    setDialogOpen(false);
  };

  const handleLoginCancel = () => {
    router.replace('/'); // Redirect to the home page on cancel
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/my-page/${newValue}`); // Update the URL when the tab changes
  };

  return (
    <Box sx={{ maxWidth: 1300, mx: 'auto' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable" // 스크롤 가능하게 설정
        scrollButtons="auto" // 필요할 때만 스크롤 버튼을 표시
        sx={{
          mt: 2,
          '& .MuiTabs-indicator': {
            backgroundColor: 'black', // Change the indicator color to black
          },
          '& .MuiTab-root': {
            color: '#9c9c9c !important', // Change the tab text color to grey
            textTransform: 'none', // Prevent uppercase transformation
            marginRight: 3, // 탭 간의 오른쪽 여백 설정
          },
          '& .Mui-selected': {
            color: '#5c5c5c !important', // Change the selected tab text color
            fontWeight: 'bold', // Make the selected tab text bold
          },
        }}
      >
        <Tab label="Profile" value="profile" />
        <Tab label="Downloads" value="downloads" />
        <Tab label="Payments" value="payments" />
        <Tab label="Reports" value="reports" />
      </Tabs>

      <Box sx={{ p: 3, mt: 3 }}>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '20vh',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {value === 'profile' && <Profile />}
            {value === 'payments' && <Payments />}
            {value === 'reports' && <ReportDetails />}
            {value === 'downloads' && <Downloads />}{' '}
          </Box>
        )}
      </Box>

      {/* Popup for Google Login */}
      <PopupGoogleLogin
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onLoginSuccess={handleLoginSuccess} // Callback on successful login
        onLoginCancel={handleLoginCancel} // Callback on login cancel
      />
    </Box>
  );
};

export default MyPage;
