// src/components/MyPage/Payments/ReportCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Link,
  Divider,
  Box,
} from '@mui/material';
import { reportConfig } from './config';
import CustomButton from '../../Components/CustomButton';

interface ReportCardProps {
  report: any;
  onLearnMore: (report: any) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onLearnMore }) => {
  const { title, type, registrationDate, processingResult } =
    reportConfig.labels;
  const {
    buttonTextDecoration,
    buttonFontWeight,
    buttonTextTransform,
    buttonColor,
    buttonFontSize,
  } = reportConfig.styles;

  return (
    <Card
      sx={{
        mb: 2,
        border: '1px solid #e4e4e4',
        borderRadius: '14px',
        my: 5,
      }}
    >
      <CardContent sx={{ backgroundColor: '#fff' }}>
        <Typography
          variant="body2"
          sx={{ color: '#acacac', fontSize: 12, letterSpacing: -0.5, mb: 1 }}
        >
          {report.registrationDate}
        </Typography>

        <Box sx={{ gap: 2, mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#9c9c9c' }}>
            <span
              style={{ color: '#ccc', width: 120, display: 'inline-block' }}
            >
              {type}:
            </span>{' '}
            {report.questionType}
          </Typography>

          <Typography variant="body2" sx={{ color: '#9c9c9c' }}>
            <span
              style={{ color: '#ccc', width: 120, display: 'inline-block' }}
            >
              {processingResult}:
            </span>{' '}
            {report.processingResult}
          </Typography>
        </Box>

        <Link
          href={`/store/${report.id}`}
          underline="hover"
          color="inherit"
          sx={{ cursor: 'pointer', lineHeight: 1.5, fontWeight: 'bold' }}
        >
          <Typography gutterBottom sx={{ fontSize: 15, fontWeight: 'bold' }}>
            {report.title}
          </Typography>
        </Link>

        <Box sx={{ mt: 3, textAlign: 'right' }}>
          <CustomButton
            label={reportConfig.labels.learnMore}
            onClick={() => onLearnMore(report)}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
