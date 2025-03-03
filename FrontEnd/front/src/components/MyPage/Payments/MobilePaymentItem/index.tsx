// src/components/MyPage/Payments/PaymentItem.tsx
import React from 'react';
import { Box, Typography, Divider, Link } from '@mui/material';
import { styled } from '@mui/system';
import { Payment } from '@/types/Payments';
import { formatAmount } from '@/utiles/paymentList';
import { formatDate } from '@/utiles/formatDate';
import PaymentActionButtons from './PaymentActionButtons';
import { paymentConfig } from './paymentConfig';

interface PaymentItemProps {
  payment: Payment;
  onViewReceipt: (payment: Payment) => void;
  onReportComplaint: (payment: Payment) => void;
  onDownloadFile: (fileUrl?: string) => void;
}

const StyledBox = styled(Box)(({ theme }) => ({
  border: '1px solid #e4e4e4',
  backgroundColor: '#fff',
  borderRadius: '14px',
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 12px 0px',
}));

const PaymentItem: React.FC<PaymentItemProps> = ({
  payment,
  onViewReceipt,
  onReportComplaint,
  onDownloadFile,
}) => {
  const { title, date, totalAmount, orderId } = paymentConfig.labels;

  return (
    <StyledBox>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ fontSize: 12, letterSpacing: -0.5, color: '#acacac' }}
      >
        {formatDate(payment.date)}
      </Typography>

      <Typography
        variant="body2"
        gutterBottom
        sx={{
          fontSize: 12,
          letterSpacing: -0.5,
          mb: 1,
          color: '#9c9c9c',
          mt: -0.5,
        }}
      >
        <span style={{ color: '#acacac' }}> Order Id : </span>
        {payment.orderId}
      </Typography>

      <Divider sx={{ mt: 1, mb: 2 }} />
      <Link
        href={`/store/${payment.id}`}
        underline="hover"
        color="inherit"
        sx={{
          cursor: 'pointer',
          lineHeight: 1.2,
          fontWeight: 'bold',
          fontSize: 15,
          pr: 4,
        }}
      >
        {payment.title}
      </Link>

      <Typography
        variant="body2"
        gutterBottom
        sx={{ mt: 0.5, color: '#7c7c7c' }}
      >
        {formatAmount(payment.totalAmount)}
      </Typography>

      <PaymentActionButtons
        isReport={payment.isReport}
        onReportComplaint={() => onReportComplaint(payment)}
        onViewReceipt={() => onViewReceipt(payment)}
        onDownloadFile={() => onDownloadFile(payment.problemFileUrl || '')}
      />
    </StyledBox>
  );
};

export default PaymentItem;
