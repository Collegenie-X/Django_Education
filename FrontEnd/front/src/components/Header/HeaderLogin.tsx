// components/HeaderLogin/HeaderLogin.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { cookieUtils } from '@/utiles/cookieUtils';
import UserMenuDialog from './UserMenuDialog';
import { useRouter } from 'next/navigation';

interface HeaderLoginProps {
  handleEmailClick: () => void;
  isMobile?: boolean;
}

const HeaderLogin: React.FC<HeaderLoginProps> = ({
  handleEmailClick,
  isMobile = false,
}) => {
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // 컴포넌트가 마운트되었음을 표시
  }, []);

  useEffect(() => {
    if (isMounted) {
      const handleUserLoggedIn = (event: CustomEvent<{ email: string }>) => {
        setStoredEmail(event.detail.email);
      };

      window.addEventListener(
        'userLoggedIn',
        handleUserLoggedIn as EventListener,
      );

      const usernameFromCookie = cookieUtils.getCookie('email');
      setStoredEmail(usernameFromCookie || null);

      return () => {
        window.removeEventListener(
          'userLoggedIn',
          handleUserLoggedIn as EventListener,
        );
      };
    }
  }, [isMounted]);

  const handleMenuToggle = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // 이벤트 전파 방지
    if (isMobile || !storedEmail) {
      handleEmailClick();
      return;
    }
    setMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  if (!isMounted) {
    // 서버와 초기 클라이언트 렌더링이 동일하도록 빈 상태로 렌더링
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          pr: isMobile ? 0 : 1,
          flexDirection: 'row',
          mt: { xs: 2, md: 0 },
          position: 'relative',
        }}
      >
        {/* 사용자 아이콘 또는 로그인 버튼 */}
        {!storedEmail ? (
          <Typography
            onClick={handleEmailClick} // 로그인 페이지로 이동
            sx={{
              color: isMobile ? '#8c8c8c' : '#acacac',
              fontSize: isMobile ? 15 : 16,
              mt: { xs: 1, md: 0 },
              cursor: 'pointer',
              '&:hover': {
                color: '#59b7fe',
              },
            }}
          >
            Login
          </Typography>
        ) : (
          <>
            {isMobile ? (
              <Typography
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/my-page/profile');
                  setTimeout(() => {
                    location.reload();
                  }, 800);
                }}
                sx={{
                  color: '#acacac',
                  fontSize: 16,
                  mt: { xs: 1, md: 0 },
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#59b7fe',
                  },
                }}
              >
                {storedEmail}
              </Typography>
            ) : (
              <Box
                onClick={handleMenuToggle}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '50%',
                  backgroundColor: menuOpen ? '#e9e9e9' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#eee',
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.5s ease', // Smooth transition
                }}
              >
                <Image
                  src={'/user_icon.png'}
                  width={60}
                  height={60}
                  alt="user icon"
                />
              </Box>
            )}
          </>
        )}

        {/* User Menu Dialog */}
        {!isMobile && (
          <UserMenuDialog
            open={menuOpen}
            onModalClose={handleMenuClose}
            username={cookieUtils.getCookie('username') || ''}
          />
        )}
      </Box>

      {/* 클릭 시 메뉴가 닫히도록 배경 클릭 감지 */}
      {menuOpen && (
        <Box
          onClick={handleMenuClose}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999,
          }}
        />
      )}
    </>
  );
};

export default HeaderLogin;
