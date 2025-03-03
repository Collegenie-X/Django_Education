import React from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Badge from '@/components/Badge'; // Badge 컴포넌트 임포트

interface BadgeProps {
  label: string;
  type: string;
  backgroundColor: string;
  color: string;
}

interface ViewBadgeSectionProps {
  badges: BadgeProps[];
}

const ViewBadgeSection: React.FC<ViewBadgeSectionProps> = ({ badges }) => {
  const router = useRouter();

  return (
    <Box mb={2} display="flex" gap={0.5} alignItems={'center'}>
      <Image
        src={'/svgs/right_arrow.svg'}
        width={25}
        height={25}
        alt="right arrow"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          router.back();
        }}
      />
      <Box display={'flex'} flexWrap={'wrap'}>
        {badges.map((badge, index) =>
          badge ? (
            <Box
              key={index}
              sx={{
                overflow: 'auto',
              }}
            >
              <Badge
                backgroundColor={badge.backgroundColor as string}
                color={badge.color as string}
              >
                {badge.label as string}
              </Badge>
            </Box>
          ) : null,
        )}
      </Box>
    </Box>
  );
};

export default ViewBadgeSection;
