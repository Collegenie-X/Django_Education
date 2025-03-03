// src/components/MyPage/Payments/ReportDetails.tsx
'use client';
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
  useMediaQuery,
  Alert,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import CustomPagination from '@/components/Pagination';
import ReportDetailsDialog from './ReportDetailsDialog';
import useReports from '@/hooks/useReports';
import ReportCard from './MobileReportDetailItem';

const itemsPerPage = 8;

const HeaderCell = styled(TableCell)({
  color: '#9a9a9a',
  fontWeight: 'bold',
  fontSize: 15,
  textAlign: 'center',
  border: 'none',
  padding: '8px 16px',
});

const BodyCell = styled(TableCell)({
  textTransform: 'none',
  fontSize: 14,
  textAlign: 'center',
  border: 'none',
  padding: '8px 16px',
});

const ReportDetails: React.FC = () => {
  const { reportsData, loading, error } = useReports();
  const [page, setPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Below 600px

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleOpenDialog = (report: any) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedReport(null);
  };

  const displayedItems = reportsData.slice(
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
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mx: { sm: 2, md: 5 } }}>
      <Typography gutterBottom sx={{ fontSize: 28 }}>
        Report Details
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
      ) : isMobile ? (
        <Box sx={{}}>
          {displayedItems.map((row, index) => (
            <ReportCard
              key={index}
              report={row}
              onLearnMore={handleOpenDialog}
            />
          ))}
        </Box>
      ) : (
        <TableContainer
          component="div"
          sx={{ border: 'none', boxShadow: 'none', my: 2, mx: 'auto' }}
        >
          <Table sx={{ maxWidth: '90vw', mx: 'auto' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--color-bg)' }}>
                <HeaderCell>Title</HeaderCell>
                <HeaderCell>Type</HeaderCell>
                <HeaderCell>Registration Date</HeaderCell>
                <HeaderCell>Processing Result</HeaderCell>
                <HeaderCell sx={{ fontSize: 14, width: 90 }}>
                  Learn More
                </HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedItems.map((row, index) => (
                <TableRow key={index}>
                  <BodyCell>{row.title}</BodyCell>
                  <BodyCell>{row.questionType}</BodyCell>
                  <BodyCell>
                    <Typography
                      sx={{
                        letterSpacing: -0.5,
                        wordSpacing: -0.5,
                        fontSize: 14,
                      }}
                    >
                      {row.registrationDate}{' '}
                    </Typography>
                  </BodyCell>
                  <BodyCell>{row.processingResult}</BodyCell>
                  <BodyCell sx={{ width: 110, px: 0.5 }}>
                    <Button
                      variant="text"
                      sx={{
                        textDecoration: 'underline',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        color: '#004B95',
                        fontSize: 13,
                      }}
                      onClick={() => handleOpenDialog(row)}
                    >
                      Learn more
                    </Button>
                  </BodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Divider sx={{ borderBottomWidth: 4, background: '#ececec' }} />

      <CustomPagination
        count={Math.ceil(reportsData.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
      />

      {selectedReport && (
        <ReportDetailsDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          data={selectedReport}
        />
      )}
    </Box>
  );
};

export default ReportDetails;
