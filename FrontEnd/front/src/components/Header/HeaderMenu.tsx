'use client';
import React from 'react';
import { Box, Typography, ListItemIcon } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { FaStar, FaBook, FaRegComments, FaCalendarAlt } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactElement;
}

interface HeaderMenuProps {
  isMobile: boolean;
}

const menuItems: MenuItem[] = [
  { label: 'Top Picks', path: '/best', icon: <FaStar /> },
  { label: 'Subjects', path: '/subject', icon: <FaBook /> },
  { label: 'Free Resources', path: '/free', icon: <FaRegComments /> },
  { label: 'Special Offers', path: '/event', icon: <FaCalendarAlt /> },
];

const HeaderMenu: React.FC<HeaderMenuProps> = ({ isMobile }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickMenu = (path: string) => {
    if (path === '/event') return;

    router.push(path);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 3 : 10,
        mt: isMobile ? 2 : 0,
        width: isMobile ? '100%' : 'auto', // 모바일일 때 전체 너비 사용
        px: isMobile ? 0 : 0,
        py: isMobile ? 1 : 0,
        borderRadius: isMobile ? 1 : 0, // 모바일일 때 모서리 둥글게
      }}
    >
      {menuItems.map((item) => (
        <Box
          key={`menu-${item.label}`}
          onClick={() => handleClickMenu(item.path)}
          sx={{
            position: 'relative',
            cursor: 'pointer',
            color:
              pathname === item.path
                ? '#0066CB'
                : isMobile
                ? '#7c7c7c'
                : '#acacac', // 활성 상태 색상
            fontSize: 18,
            transition: 'color 0.3s, background-color 0.3s',
            paddingBottom: '4px',
            width: isMobile ? '100%' : 'auto', // 모바일일 때 전체 너비 사용
            textAlign: isMobile ? 'left' : 'left', // 모바일일 때 텍스트 중앙 정렬
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&:hover': {
              color: '#2976d2',
              backgroundColor: isMobile
                ? 'rgba(0, 102, 203, 0.1)'
                : 'transparent', // 호버 시 배경색 변경
            },
            backgroundColor:
              pathname === item.path && isMobile
                ? 'rgba(0, 102, 203, 0.1)'
                : 'transparent', // 활성화 상태 배경색
            borderRadius: 1,
            padding: isMobile ? '14px 12px' : '0',
          }}
        >
          <Typography
            sx={{
              pl: isMobile ? 2 : 0,
              letterSpacing: '-0.02em',
              wordSpacing: '0.2em',
            }}
          >
            {item.label}
          </Typography>

          {isMobile && (
            <ListItemIcon
              sx={{
                minWidth: 'auto',
                color: 'inherit',
                position: 'absolute',
                right: 20,
              }}
            >
              <IoIosArrowForward />
            </ListItemIcon>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default HeaderMenu;
