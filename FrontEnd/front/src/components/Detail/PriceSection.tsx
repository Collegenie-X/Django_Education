// src/components/Detail/PriceSection.tsx

'use client'; // 최상단에 위치해야 합니다.

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import PaymentAgreeDialog from '@/components/Payment/PaymentAgreeDialog';
import PopupGoogleLogin from '@/components/Auth/PopupGoogleLogin';
import { verifyToken } from '@/api/ApiUser';
import Image from 'next/image';
import useDownloads from '@/hooks/useDownloadsAPI';

interface PriceSectionProps {
  data: {
    price: number;
    discounted_price?: number;
    title: string;
    id: string;
    is_free: boolean;
    file_url?: string;
  };
  isPayment: boolean;
  fileUrl: string | null;
}

// 헬퍼 컴포넌트: DiscountBadge
const DiscountBadge: React.FC<{
  isFree: boolean;
  discountPercentage: number;
}> = ({ isFree, discountPercentage }) => {
  if (isFree) {
    return (
      <Box
        sx={{
          width: 50,
          textAlign: 'center',
          backgroundColor: '#e2f2fe',
          color: '#8bcbff',
          fontSize: 15,
          fontWeight: 'bold',
          padding: '4px 8px',
          borderRadius: '10px',
        }}
      >
        Free
      </Box>
    );
  }

  if (discountPercentage > 0) {
    return (
      <Box
        sx={{
          width: 50,
          textAlign: 'center',
          backgroundColor: '#e2f2fe',
          color: '#8bcbff',
          fontSize: 15,
          fontWeight: 'bold',
          padding: '4px 8px',
          borderRadius: '10px',
        }}
      >
        {`${discountPercentage}%`}
      </Box>
    );
  }

  return null;
};

// 헬퍼 함수: 최종 가격 및 할인율 계산
const calculatePricing = (price: number, discountedPrice?: number) => {
  const finalPrice =
    discountedPrice && discountedPrice > 0 ? discountedPrice : price;
  const discountPercentage =
    price > 0 && discountedPrice && discountedPrice > 0
      ? Math.round((1 - discountedPrice / price) * 100)
      : 0;
  return { finalPrice, discountPercentage };
};

const PriceSection: React.FC<PriceSectionProps> = ({
  data,
  isPayment,
  fileUrl,
}) => {
  const {
    price,
    discounted_price,
    title,
    id: problemId,
    is_free,
    file_url: freeFileUrl,
  } = data;

  const [paymentAgreeDialogOpen, setPaymentAgreeDialogOpen] = useState(false);
  const [isGooglePopup, setIsGooglePopup] = useState(false);

  const { createDownload } = useDownloads();

  const { finalPrice, discountPercentage } = calculatePricing(
    price,
    discounted_price,
  );

  // 파일 다운로드 및 다운로드 기록 생성 핸들러
  const handleDownload = async (url: string, id: string) => {
    if (!url) {
      alert('파일이 누락되었습니다.');
      return;
    }

    window.open(url, '_blank');
    createDownload(id);
  };

  // "Buy Now" 또는 "Download" 버튼 클릭 핸들러
  const handleBuyNowClick = async () => {
    try {
      const tokenResponse = await verifyToken();
      if (!tokenResponse?.is_valid) {
        setIsGooglePopup(true);
        return;
      }

      if (is_free && freeFileUrl) {
        handleDownload(freeFileUrl, problemId);
        return;
      }

      if (!isPayment) {
        setPaymentAgreeDialogOpen(true);
        return;
      }

      if (fileUrl) {
        handleDownload(fileUrl, problemId);
      } else {
        alert('파일이 누락되었습니다. 다운로드 파일을 업로드 해주세요.');
      }
    } catch (error) {
      console.error('토큰 검증 중 오류:', error);
      setIsGooglePopup(true);
    }
  };

  // 현재 URL을 클립보드에 복사하는 핸들러
  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      })
      .catch(() => {
        alert('링크 복사에 실패했습니다.');
      });
  };

  // 필요한 데이터가 없는 경우 조기 반환
  if (!data) {
    return null;
  }

  return (
    <Box
      sx={{
        border: '1px solid #e9e9e9',
        ml: 2,
        px: 3,
        py: 3,
        textAlign: 'left',
        borderRadius: '12px',
        backgroundColor: '#fff',
        position: 'sticky',
        top: 230,
        width: { sm: '100%', md: '80%' },
        maxWidth: { sm: '90%', md: 300, lg: 300 },
        zIndex: 100,
      }}
    >
      {/* 할인 또는 무료 배지 */}
      {(discounted_price && discounted_price > 0) || is_free ? (
        <DiscountBadge
          isFree={is_free}
          discountPercentage={discountPercentage}
        />
      ) : null}
      <Box display={'flex'} alignItems={'center'} gap={1} ml={0.5}>
        {/* 가격 표시 */}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!is_free && (
            <Typography
              sx={{
                fontSize: '28px',
                fontWeight: 'bold',
                letterSpacing: -0.5,
              }}
            >
              ${Number(finalPrice).toFixed(2)}
            </Typography>
          )}
        </Box>

        {/* 원래 가격 (할인 시 취소선) */}
        {discounted_price && discounted_price > 0 && (
          <Typography
            sx={{
              color: is_free ? '#3f3f3f' : '#999',
              textDecoration: 'line-through',
              fontSize: is_free ? '28px' : '24px',
              letterSpacing: -0.5,
            }}
          >
            ${Number(price).toFixed(2)}
          </Typography>
        )}

        {/* 할인되지 않은 경우 무료일 때 원래 가격 표시 */}
        {!discounted_price && is_free && (
          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 'normal',
              color: '#3c3c3c',
              letterSpacing: -0.5,
              textDecoration: 'line-through',
            }}
          >
            ${price.toFixed(2)}
          </Typography>
        )}

        {isPayment && (
          <Image
            src="/images/payment_mark.png"
            height={40}
            width={40}
            alt="Payment Mark"
            style={{ marginTop: -5 }}
          />
        )}
      </Box>

      {/* 액션 버튼들 */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: '#2BA8FF',
          fontSize: '18px',
          textTransform: 'none',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '12px',
        }}
        onClick={handleBuyNowClick}
      >
        {is_free || isPayment ? 'Download' : 'Buy Now'}
      </Button>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          fontSize: '18px',
          textTransform: 'none',
          padding: '12px',
          borderRadius: '8px',
        }}
        onClick={handleShare}
      >
        Share
      </Button>

      {/* 결제 동의 다이얼로그 */}
      <PaymentAgreeDialog
        dialogOpen={paymentAgreeDialogOpen}
        setDialogOpen={setPaymentAgreeDialogOpen}
        onClose={() => setPaymentAgreeDialogOpen(false)}
        price={Number(finalPrice)}
        title={title}
        problemId={String(problemId)}
      />

      {/* 구글 로그인 팝업 */}
      <PopupGoogleLogin
        dialogOpen={isGooglePopup}
        setDialogOpen={setIsGooglePopup}
        onLoginSuccess={async () => {
          setIsGooglePopup(false);
          // 로그인 성공 후 페이지를 새로고침하여 결제 상태를 갱신합니다.
          window.location.reload();
        }}
        onLoginCancel={() => {
          setIsGooglePopup(false);
        }}
      />
    </Box>
  );
};

export default PriceSection;
