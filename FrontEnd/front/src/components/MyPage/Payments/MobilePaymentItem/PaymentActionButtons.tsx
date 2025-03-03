import React from 'react';
import { Box, Typography } from '@mui/material';
import { paymentConfig } from './paymentConfig';
import CustomButton from '../../Components/CustomButton';

interface PaymentActionButtonsProps {
  isReport: boolean;
  onReportComplaint: () => void;
  onViewReceipt: () => void;
  onDownloadFile: () => void;
}

const PaymentActionButtons: React.FC<PaymentActionButtonsProps> = ({
  isReport,
  onReportComplaint,
  onViewReceipt,
  onDownloadFile,
}) => {
  const { reportComplete, reportButton, receiptButton, downloadButton } =
    paymentConfig.labels;
  const { reportedColor, reportedFontSize } = paymentConfig.styles;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.5,
        mt: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {isReport ? (
        <Typography
          sx={{ color: '#3c3c3c', fontSize: reportedFontSize, mr: 1 }}
        >
          {reportComplete}
        </Typography>
      ) : (
        <CustomButton label={reportButton} onClick={onReportComplaint} />
      )}
      <CustomButton label={receiptButton} onClick={onViewReceipt} />
      <CustomButton label={downloadButton} onClick={onDownloadFile} />
    </Box>
  );
};

export default PaymentActionButtons;
