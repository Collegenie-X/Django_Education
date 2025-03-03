'use client'; // 이 줄을 추가합니다.
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/system';
import Badge from '../../Badge';
import { TYPE_CHOICES, SUBJECT_CHOICES } from '../../Badge/config';
import { useRouter } from 'next/navigation';
import { StoreProps } from '@/types/store';
import PriceSection from './PriceSection';
import RatingSection from './RatingSection';

// Styled Components with responsive sizes
const CardContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  width: '100%', // 변경: 반응형을 위해 고정 너비 제거
  maxWidth: 300, // 최대 너비 설정
  margin: '0 auto',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  width: 200, // xs
  height: 250,
  [theme.breakpoints.up('xs')]: {
    width: 300, // sm
    height: 390,
  },
  [theme.breakpoints.up('sm')]: {
    width: 270, // sm
    height: 340,
  },
  [theme.breakpoints.up('md')]: {
    width: 270, // md
    height: 340,
  },
  '&:hover .overlay': {
    opacity: 1,
  },
  '&:hover img': {
    transform: 'scale(1.1)',
  },
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  color: '#fff',
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  pointerEvents: 'none',
}));

// Utility Function
const getLabelWithLimit = (label: string, type: string): string => {
  const limit = type === 'type' ? 20 : 20;
  return label.length > limit ? `${label.slice(0, limit)}...` : label;
};

// BadgeList Component
interface BadgeListProps {
  badges: Array<{
    label: string;
    type: string;
    backgroundColor: string;
    color: string;
  }>;
  getLabel: (label: string, type: string) => string;
}

const BadgeList: React.FC<BadgeListProps> = ({ badges, getLabel }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      mt: 1,
      gap: 1, // gap 조정
    }}
  >
    {badges.map((badge, index) => (
      <Badge
        key={index}
        backgroundColor={badge.backgroundColor}
        color={badge.color}
      >
        {getLabel(badge.label, badge.type)}
      </Badge>
    ))}
  </Box>
);

// Main CardItem Component
interface CardItemProps {
  item: StoreProps;
}

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  const {
    id,
    title,
    price,
    problem_type,
    discounted_price,
    total_score,
    total_comments,
    preview_images,
    write_user_name,
    subject,
    type,
    description,
    is_free,
  } = item;

  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/store/${id}`);
  };

  // Find configurations based on subject and type
  const subjectConfig = SUBJECT_CHOICES.find(
    (choice) => choice.value === subject,
  );
  const typeConfig = TYPE_CHOICES.find((choice) => choice.value === type);

  // Prepare badges
  const badges = [
    // {
    //   label: write_user_name,
    //   type: 'user_name',
    //   backgroundColor: '#E2F2FE',
    //   color: '#419AFF',
    // },
    subjectConfig && {
      label: subjectConfig.label,
      type: 'subject',
      backgroundColor: subjectConfig.backgroundColor,
      color: subjectConfig.color,
    },
    type && {
      label: Array.isArray(type) ? (type.length > 0 ? type[0] : '') : type,
      type: 'type',
      backgroundColor: '#F8F8F8',
      color: '#9c9c9c',
    },
  ].filter(Boolean) as Array<{
    label: string;
    type: string;
    backgroundColor: string;
    color: string;
  }>;

  return (
    <CardContainer sx={{ my: 4 }}>
      {/* Image Section with Hover Effect */}

      <ImageContainer
        onClick={handleImageClick}
        sx={{
          borderRadius: 5,
          backgroundColor: problem_type === 'Premium' ? '#0089f0' : '#dfdfdf',
          border:
            problem_type === 'Premium'
              ? '6px solid #0089f0'
              : '1px solid #dfdfdf',
        }}
      >
        <Image
          src={preview_images?.[0]?.image_url || '/svgs/default-image.svg'}
          alt={title}
          layout="fill" // Next.js Image 최적화
          objectFit="fill"
          style={{
            borderRadius: '10px',
            transition: 'transform 0.3s ease-in-out',
          }}
        />

        <ImageOverlay className="overlay">
          <BadgeList badges={badges} getLabel={getLabelWithLimit} />
          <Typography
            variant="body2"
            sx={{
              mx: 'auto',
              width: '95%',
              letterSpacing: 0.1,
              wordSpacing: -0.1,
              textOverflow: 'ellipsis',
              textAlign: 'center',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 3,
            }}
          >
            {description}
          </Typography>
        </ImageOverlay>
      </ImageContainer>

      {/* Title */}
      <Typography
        sx={{
          mt: 1.5,
          px: 2,
          fontSize: { xs: 18, sm: 18 }, // sm을 17에서 20으로 변경
          fontWeight: 'bold',
          width: '100%',
          height: title.length > 30 ? 40 : 30,
          textAlign: 'left',
          letterSpacing: -0.5,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textTransform: 'capitalize',
          lineHeight: 1.2,
          display: 'flex',
          textAlignLast: title.length > 27 ? 'left' : 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title.length > 50 ? `${title.slice(0, 50)}...` : title}
      </Typography>

      {/* Price and Rating Section */}
      <Box
        sx={{
          display: 'flex',
          px: title.length > 27 ? 1 : 4,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <PriceSection
          isFree={is_free}
          price={Number(price)}
          discountedPrice={Number(discounted_price)}
        />
        <RatingSection
          totalScore={Number(total_score)}
          totalComments={Number(total_comments)}
        />
      </Box>
    </CardContainer>
  );
};

export default CardItem;
