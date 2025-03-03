// src/components/MyPage/Payments/ReportActionButtons.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { reportConfig } from './config';

interface ReportActionButtonsProps {
  isReport: boolean;
  onReportComplaint: () => void;
  onViewReceipt: () => void;
}

const ReportActionButtons: React.FC<ReportActionButtonsProps> = ({
  isReport,
  onReportComplaint,
  onViewReceipt,
}) => {
  const { reportComplete, reportButton } = reportConfig.labels;
  const {
    buttonTextDecoration,
    buttonFontWeight,
    buttonTextTransform,
    buttonColor,
    buttonFontSize,
    reportedColor,
    reportedFontSize,
  } = reportConfig.styles;

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      {isReport ? (
        <Typography sx={{ color: reportedColor, fontSize: reportedFontSize }}>
          {reportComplete}
        </Typography>
      ) : (
        <Button
          variant="text"
          sx={{
            textDecoration: buttonTextDecoration,
            fontWeight: buttonFontWeight,
            textTransform: buttonTextTransform,
            color: buttonColor,
            fontSize: buttonFontSize,
          }}
          onClick={onReportComplaint}
        >
          {reportButton}
        </Button>
      )}
      <Button
        variant="text"
        sx={{
          textDecoration: buttonTextDecoration,
          fontWeight: buttonFontWeight,
          textTransform: buttonTextTransform,
          color: buttonColor,
          fontSize: buttonFontSize,
        }}
        onClick={onViewReceipt}
      >
        {reportConfig.labels.learnMore}
      </Button>
    </Box>
  );
};

export default ReportActionButtons;
