// src/components/MyPage/Payments/MyPayments.tsx
'use client'; // Next.js 13 이상 사용 시 추가

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Link,
  useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import CustomPagination from '@/components/Pagination';
import ReceiptDialog from './ReceiptDialog';
import usePayments from '@/hooks/usePayments';
import { formatAmount } from '@/utiles/paymentList';
import ReportComplaintDialog from './ReportComplaintDialog';
import PaymentItem from './MobilePaymentItem'; // 새로 생성한 PaymentItem 컴포넌트
import { Payment } from '@/types/Payments'; // Payment 타입 임포트
import { formatDate } from '@/utiles/formatDate';

const HeaderCell = styled(TableCell)(({ theme }) => ({
  color: '#9a9a9a',
  fontWeight: 'bold',
  fontSize: 15,
  textAlign: 'center',
  border: 'none',
  padding: theme.spacing(1, 2),
}));

const BodyCell = styled(TableCell)(({ theme }) => ({
  textTransform: 'none',
  fontSize: 14,
  textAlign: 'center',
  border: 'none',
  padding: theme.spacing(1, 2),
}));

const itemsPerPage = 8;

const MyPayments: React.FC = () => {
  const { paymentsData, loading, error } = usePayments();
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 600px 이하

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleOpenReceiptDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsReceiptDialogOpen(true);
  };

  const handleCloseReceiptDialog = () => {
    setIsReceiptDialogOpen(false);
    setSelectedPayment(null);
  };

  const handleOpenComplaintDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setDialogOpen(true);
  };

  const handleCloseComplaintDialog = () => {
    setDialogOpen(false);
    setSelectedPayment(null);
  };

  const handleDownloadFile = (fileUrl?: string) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else {
      alert('파일 URL이 없습니다. 다운로드 파일을 업로드해주세요.');
    }
  };

  const displayedItems: Payment[] = paymentsData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Alert severity="error">
          {error}
          <Button onClick={() => window.location.reload()} sx={{ ml: 2 }}>
            Re try
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mx: { sm: 0, md: 5 } }}>
      <Typography gutterBottom sx={{ fontSize: 28 }}>
        Payments
      </Typography>
      <Divider sx={{ borderBottomWidth: 4, background: '#ececec' }} />

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '25vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {isMobile ? (
            <Box sx={{}}>
              {displayedItems.map((payment) => (
                <PaymentItem
                  key={payment.id}
                  payment={payment}
                  onViewReceipt={handleOpenReceiptDialog}
                  onReportComplaint={handleOpenComplaintDialog}
                  onDownloadFile={handleDownloadFile}
                />
              ))}
            </Box>
          ) : (
            <TableContainer
              component="div"
              sx={{ border: 'none', boxShadow: 'none', my: 3, mx: 'auto' }}
            >
              <Table sx={{ maxWidth: '90vw' }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'var(--color-bg)' }}>
                    <HeaderCell>Date</HeaderCell>
                    <HeaderCell>Title</HeaderCell>
                    <HeaderCell>Total Amount</HeaderCell>
                    <HeaderCell>Order ID</HeaderCell>
                    <HeaderCell sx={{ fontSize: 14 }}>
                      Report a complaint
                    </HeaderCell>
                    <HeaderCell>Receipt</HeaderCell>
                    <HeaderCell>Download</HeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedItems.map((payment) => (
                    <TableRow key={payment.id}>
                      <BodyCell sx={{ width: 120 }}>
                        <Typography
                          sx={{
                            letterSpacing: -1,
                            wordSpacing: -0.5,
                            fontSize: 14,
                          }}
                        >
                          {formatDate(payment.date)}
                        </Typography>
                      </BodyCell>
                      <BodyCell sx={{ maxWidth: 250 }}>
                        <Link
                          href={`/store/${payment.problemId}`} // 문제 링크
                          underline="hover"
                          color="inherit"
                          sx={{ cursor: 'pointer' }}
                        >
                          {payment.title}
                        </Link>
                      </BodyCell>
                      <BodyCell sx={{ width: 120 }}>
                        {formatAmount(payment.totalAmount)}
                      </BodyCell>
                      <BodyCell>{payment.orderId}</BodyCell>
                      <BodyCell sx={{ width: 70 }}>
                        {payment.isReport ? (
                          <Typography sx={{ color: '#acacac', fontSize: 14 }}>
                            Reported
                          </Typography>
                        ) : (
                          <Button
                            variant="text"
                            sx={{
                              textDecoration: 'underline',
                              fontWeight: 'bold',
                              textTransform: 'none',
                              color: '#004B95',
                              fontSize: 13,
                            }}
                            onClick={() => handleOpenComplaintDialog(payment)}
                          >
                            Write
                          </Button>
                        )}
                      </BodyCell>
                      <BodyCell>
                        <Button
                          variant="text"
                          sx={{
                            textDecoration: 'underline',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: '#004B95',
                            fontSize: 13,
                          }}
                          onClick={() => handleOpenReceiptDialog(payment)}
                        >
                          View
                        </Button>
                      </BodyCell>
                      <BodyCell sx={{ cursor: 'pointer' }}>
                        <Button
                          variant="text"
                          sx={{
                            textDecoration: 'underline',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            color: '#004B95',
                            fontSize: 13,
                          }}
                          onClick={() =>
                            handleDownloadFile(payment?.problemFileUrl || '')
                          }
                        >
                          Download
                        </Button>
                      </BodyCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      <Divider sx={{ borderBottomWidth: 4, background: '#ececec' }} />

      <CustomPagination
        count={Math.ceil(paymentsData.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
      />

      {selectedPayment && (
        <ReceiptDialog
          open={isReceiptDialogOpen}
          onClose={handleCloseReceiptDialog}
          data={selectedPayment}
          userName={selectedPayment.customer_name || 'Unknown'} // 기본값 설정
        />
      )}

      {selectedPayment && (
        <ReportComplaintDialog
          open={dialogOpen}
          onClose={handleCloseComplaintDialog}
          problem_id={selectedPayment.problemId.toString()} // string으로 변환
          payment_id={selectedPayment.id.toString()} // string으로 변환
        />
      )}
    </Box>
  );
};

export default MyPayments;
