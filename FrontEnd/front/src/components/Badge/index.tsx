'use client';
import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

// Badge 컴포넌트 생성
interface BadgeProps {
  backgroundColor: string;
  color?: string;
  children: React.ReactNode; // label 대신 children으로 변경
}

const BadgeContainer = styled(Typography)<BadgeProps>(
  ({ backgroundColor, color }) => ({
    backgroundColor,
    fontSize: 14,
    color: color || '#fff', // 기본 글자 색을 흰색으로 설정
    borderRadius: 80,
    // whiteSpace: 'nowrap',
  }),
);

const Badge: React.FC<BadgeProps> = ({ children, backgroundColor, color }) => {
  return (
    <BadgeContainer
      backgroundColor={backgroundColor}
      color={color}
      variant="caption"
      sx={{ px: '10px', py: '2px' }}
    >
      {children} {/* children으로 텍스트 전달 */}
    </BadgeContainer>
  );
};

export default Badge;
