'use client';
import React from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
  Link,
} from '@mui/material';
import Image from 'next/image';
import { Report, AnswerDetails } from './types';
interface ReportDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  data: Report;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#3c3c3c',
  fontSize: 14,
}));

const ReportDetailsDialog: React.FC<ReportDetailsDialogProps> = ({
  open,
  onClose,
  data,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{ borderRadius: 2 }}
    >
      <DialogTitle
        sx={{
          color: '#9a9a9a',
          fontSize: 18,
          mt: { sm: 1, md: 3 },
          ml: { sm: 2, md: 5 },
        }}
      >
        Report Details
      </DialogTitle>

      <DialogContent sx={{ mb: 3 }}>
        <Divider sx={{ borderBottomWidth: 2 }} />

        {/* Problem Details Table */}
        <TableContainer sx={{ mt: { sm: 1, md: 3 } }}>
          <Table>
            <TableBody>
              <TableRow>
                {data.problemDetails.grade && (
                  <StyledTableCell>Grade</StyledTableCell>
                )}
                <StyledTableCell>Subject</StyledTableCell>
                <StyledTableCell>Problem Title</StyledTableCell>
                <StyledTableCell>Registration date</StyledTableCell>
                <StyledTableCell>Report type</StyledTableCell>
                <StyledTableCell>Processing result</StyledTableCell>
              </TableRow>
              <TableRow>
                {data.problemDetails.grade && (
                  <StyledTableCell>{data.problemDetails.grade}</StyledTableCell>
                )}
                <StyledTableCell>{data.problemDetails.subject}</StyledTableCell>

                <StyledTableCell>
                  {
                    <Link
                      href={`/store/${data.problemDetails.id}`} // 문제 링크
                      underline="hover"
                      color="inherit"
                      sx={{ cursor: 'pointer' }}
                    >
                      {data.problemDetails.title}
                    </Link>
                  }
                </StyledTableCell>
                <StyledTableCell>{data.registrationDate}</StyledTableCell>
                <StyledTableCell>{data.questionType}</StyledTableCell>
                <StyledTableCell>{data.processingResult}</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Description Section */}
        <Divider
          sx={{ my: 2, borderBottomWidth: 4, backgroundColor: '#7c7c7c' }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 5,
            mb: 5,
          }}
        >
          <Typography sx={{ fontSize: '0.82em', color: '#9d9d9d', width: 60 }}>
            Report Title
          </Typography>
          <Typography variant="body2" sx={{ ml: { sm: 5, md: 10 } }}>
            {data.title}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#5d5d5d', mt: 1 }}>
          {data.description}
        </Typography>

        {/* Answer Details Section */}
        <Divider
          sx={{
            mt: 5,
            mb: 3,
            borderBottomWidth: 1,
            backgroundColor: '#efefef',
          }}
        />

        {data.answerDetails.length > 0 && (
          <>
            <Typography
              sx={{ fontSize: '0.92em', color: '#3f3f3f', mt: 2, mb: 3 }}
            >
              Answer
            </Typography>

            {data.answerDetails.map((answer: AnswerDetails, index: number) => (
              <Box key={index} sx={{ mt: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#5d5d5d' }}>
                  {answer.content}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 30,
            right: 30,
            minWidth: '20px',
            width: '20px',
            height: '20px',
            margin: 0,
            padding: 0,
          }}
        >
          <Image
            src="/svgs/close-receipt.svg"
            alt="close icon"
            width={22}
            height={22}
          />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDetailsDialog;
