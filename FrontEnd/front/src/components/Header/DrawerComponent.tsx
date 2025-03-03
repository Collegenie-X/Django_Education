import React from 'react';
import { Box, Drawer, IconButton, Divider, List } from '@mui/material';
import HeaderMenu from './HeaderMenu';
import HeaderLogin from './HeaderLogin';
import Image from 'next/image';

interface DrawerComponentProps {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
  handleEmailClick: () => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  drawerOpen,
  toggleDrawer,
  handleEmailClick,
}) => {
  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(5px)',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box
        sx={{
          width: 280,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          height: '100%',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {/* 로고 섹션 */}
        <Box sx={{ mb: -1 }}>
          <Image
            src={'/studyola_store_logo.png'}
            alt={'StudyOla Store Logo'}
            height={80}
            width={160}
          />
        </Box>

        <Divider sx={{ width: '100%' }} />

        {/* 메뉴 섹션 */}
        <List sx={{ width: '100%', flexGrow: 1 }}>
          <HeaderMenu isMobile={true} />
        </List>

        <Divider sx={{ width: '100%', mt: 1 }} />

        {/* 로그인 섹션 */}
        <Box sx={{ mb: 2 }}>
          <HeaderLogin handleEmailClick={handleEmailClick} isMobile={true} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
